import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ItemDTO } from 'src/app/DTOs/ItemDTO';

@Component({
  selector: 'app-product-edit-dialog',
  templateUrl: './product-edit-dialog.component.html',
  styleUrls: ['./product-edit-dialog.component.scss'],
  providers:[DialogService ]
})
export class ProductEditDialogComponent {
  ref: DynamicDialogRef | undefined;
  constructor(public dialogService: DialogService ,public dialogRef: MatDialogRef<ProductEditDialogComponent>) {}

  show() {
      this.ref = this.dialogService.open(ProductEditDialogComponent, {
          header: 'Select a Product',
          width: '70%',
          contentStyle: { overflow: 'auto' },
          baseZIndex: 10000,
          maximizable: true
      });
  }
}
