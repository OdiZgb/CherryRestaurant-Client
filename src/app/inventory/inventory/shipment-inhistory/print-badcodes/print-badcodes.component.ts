import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-print-badcodes',
  templateUrl: './print-badcodes.component.html',
  styleUrls: ['./print-badcodes.component.scss'],
  providers:[DialogService ]

})
export class PrintBadcodesComponent {
  ref: DynamicDialogRef | undefined;
  constructor(public dialogService: DialogService ,public dialogRef: MatDialogRef<PrintBadcodesComponent>) {}
  show() {
    this.ref = this.dialogService.open(PrintBadcodesComponent, {
        header: 'Select a Product',
        width: '70%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
    });
}
}
