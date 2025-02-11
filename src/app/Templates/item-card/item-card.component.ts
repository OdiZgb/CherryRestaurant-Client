import { AfterContentInit, AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogAnimationsExampleDialog } from '../dialog-animations-example-dialog/dialog-animations-example-dialog.component';
import { Router } from '@angular/router';
import { TagDTO } from 'src/app/DTOs/TagDTO';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit,AfterContentInit {

  @Input() name:string='';
  @Input() barcode:string='';
  @Input() category:string='';
  @Input() marka:string='';
  @Input() description:string='';
  @Input() priceIn?:number=0;
  @Input() priceOut?:number=0;
  @Input() src:string ='/src/vapeItemPlaceHolder.png' ;
  @Input() itemId:number=0;
  @Input() tags:TagDTO[]=[];

  constructor(public dialogAnimationsExampleDialog:DialogAnimationsExampleDialog, private router: Router) {}
  ngAfterContentInit(): void {
  }
 
  ngOnInit(): void {

  }

  moveTOItemView(){
    this.router.navigate(['/items/view/', this.itemId]);
  }

  deleteItem(){
    localStorage.setItem("deleteNumber", 0+"");

    this.dialogAnimationsExampleDialog.openDialog(this.itemId);
  }
}
