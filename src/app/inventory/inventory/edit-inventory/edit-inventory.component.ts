import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryService } from 'src/app/services/InventoryService/inventory.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-inventory',
  templateUrl: './edit-inventory.component.html',
  styleUrls: ['./edit-inventory.component.scss']
})
export class EditInventoryComponent {
  editForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditInventoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { inventory: any }, 
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private messageService: MessageService
  ) {
    // Initialize the form with only the editable fields
    this.editForm = this.fb.group({
      numberOfUnits: [data.inventory.numberOfUnits, Validators.required], // Editable field
    });
  }

  // Save the changes and update the backend
  saveChanges() {
    if (this.editForm.valid) {
      const updatedQuantity = {
        numberOfUnits: this.editForm.value.numberOfUnits
      };

      // Send only the number of units to the backend
      this.inventoryService.editInventoryQuantity(this.data.inventory.id, updatedQuantity).subscribe({
        next: () => {
          this.dialogRef.close();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Inventory quantity updated successfully' });
        },
        error: () => {
          console.error('Error updating inventory:');
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update inventory' });
        }
      });
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
