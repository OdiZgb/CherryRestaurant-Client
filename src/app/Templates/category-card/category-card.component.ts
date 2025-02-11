import { Component, Input } from '@angular/core';
import { DialogAnimationsExampleDialog } from '../dialog-animations-example-dialog/dialog-animations-example-dialog.component';
import { DeleteCategoryDialogComponent } from '../delete-category-dialog/delete-category-dialog.component';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent {
  @Input() name:string='';
  @Input() barcode:string='';
  @Input() category:string='';
  @Input() marka:string='';
  @Input() description:string='';
  @Input() price:string='';
  @Input() src:string ='/src/vapeItemPlaceHolder.png' ;
  @Input() itemId:number=0;
  @Input() categoryId:number=0;

  constructor(public deleteCategoryDialogComponent:DeleteCategoryDialogComponent) {}

  deleteCategory(){
      
      this.deleteCategoryDialogComponent.openDialog(this.categoryId);
    }
}
