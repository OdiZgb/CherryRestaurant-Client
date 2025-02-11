import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InventoryDTO } from 'src/app/DTOs/InventoryDTO';
import { TraderDTO } from 'src/app/DTOs/TraderDTO';
import { EmployeeDTO } from 'src/app/DTOs/EmployeeDTO';
import { PriceInDTO } from 'src/app/DTOs/PriceInDTO';
import { MainSeviceService } from 'src/app/main-sevice.service';

@Component({
  selector: 'app-edit-inventory-dialog',
  templateUrl: './edit-inventory-dialog.component.html',
  styleUrls: ['./edit-inventory-dialog.component.scss']
})
export class EditInventoryDialogComponent implements OnInit {
  editForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditInventoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InventoryDTO,
    private fb: FormBuilder,
    private mainsService: MainSeviceService  // Inject the main service
  ) {
    // Initialize form with empty controls, will populate in ngOnInit
    this.editForm = this.fb.group({
      name: [''],
      category: [''],
      brand: [''],
      trader: [''],
      employee: [''],
      expirationDate: [''],
      amountPurchased: [''],
      pricePerUnit: [''],
      dateAdded: ['']
    });
  }

  ngOnInit(): void {
    // Populate form controls with data passed to the dialog
    this.editForm.patchValue({
      name: this.data.itemDTO?.name,
      category: this.data.itemDTO?.categoryDTO?.name,
      brand: this.data.itemDTO?.markaDTO?.name,
      trader: this.data.traderDTO?.name,
      expirationDate: this.data.expirationDate,
      amountPurchased: this.data.numberOfUnits,
      pricePerUnit: this.data.priceInDTO?.price,
      dateAdded: this.data.arrivalDate
    });

    // Set employee data
    this.setEmployeeFromStorage();
  }

  setEmployeeFromStorage(): void {
    const currentEmployeeId = parseInt(localStorage.getItem('employeeId') || '0', 10);

    this.mainsService.employeeService.getAllEmployees$().subscribe(employees => {
      const employeeDTO = employees.find(e => e.id === currentEmployeeId);
      if (employeeDTO) {
        this.editForm.patchValue({
          employee: employeeDTO.user.name  // Set the employee's name in the form
        });
        this.editForm.get('employee')?.disable();  // Disable the field to prevent editing
      } else {
        console.error('Employee not found for ID:', currentEmployeeId);
      }
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const updatedTrader: TraderDTO = {
        id: this.data.traderDTO?.id || 0,
        name: this.editForm.get('trader')?.value || '',
        mobileNumber: this.data.traderDTO?.mobileNumber || null,
        email: this.data.traderDTO?.email || null,
        inventories: this.data.traderDTO?.inventories || null
      };

      const updatedEmployee: EmployeeDTO = {
        id: this.data.employee?.id || 0,
        userId: this.data.employee?.userId || 0,
        user: {
          id: this.data.employee?.user.id || 0,
          name: this.editForm.get('employee')?.value || '',
          email: this.data.employee?.user.email || null,
          password: this.data.employee?.user.password || null,
          securityLevel: this.data.employee?.user.securityLevel || null,
          userType: this.data.employee?.user.userType || null,
          isTrader: this.data.employee?.user.isTrader || false,
          isEmployee: this.data.employee?.user.isEmployee || false,
          isClient: this.data.employee?.user.isClient || false,
          token: this.data.employee?.user.token || null,
          employee: this.data.employee?.user.employee || null
        }
      };

      const updatedPriceIn: PriceInDTO = {
        id: this.data.priceInDTO?.id || 0,
        price: this.editForm.get('pricePerUnit')?.value || 0,
        date: this.data.priceInDTO?.date || '',
        expirationDate: this.data.priceInDTO?.expirationDate || ''
      };

      const updatedInventory: InventoryDTO = {
        id: this.data.id,
        traderDTO: updatedTrader,
        employee: updatedEmployee,
        expirationDate: this.editForm.get('expirationDate')?.value || null,
        numberOfUnits: this.editForm.get('amountPurchased')?.value || 0,
        priceInDTO: updatedPriceIn,
        arrivalDate: this.editForm.get('dateAdded')?.value || null,
        barcode: this.data.barcode,
        itemDTO: this.data.itemDTO,
        patchId: this.data.patchId,
        traderId: updatedTrader.id,
        employeeId: updatedEmployee.id,
        itemId: this.data.itemId,
        priceInId: this.data.priceInId,
        manufacturingDate: this.data.manufacturingDate,
        imagePath: this.data.imagePath
      };

      this.dialogRef.close(updatedInventory);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
