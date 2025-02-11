import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ItemDTO } from 'src/app/DTOs/ItemDTO';
import { DialogAnimationsExampleDialog } from 'src/app/Templates/dialog-animations-example-dialog/dialog-animations-example-dialog.component';
import { ItemListService } from 'src/app/services/ItemsService/item-list.service';
import { ProductEditDialogComponent } from '../edit-item/product-edit-dialog/product-edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AppStore } from 'src/app/AppStore/AppStore';

@Component({
  selector: 'app-item-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.scss'],
  providers:[DialogService]
})
export class ItemViewComponent implements OnInit {
  apiURL ='https://localhost:7260';

  itemId='';
  
  itemDTO: ItemDTO = {barcode:""} as ItemDTO ;
  imageURL = '';
  ref: DynamicDialogRef | undefined;
  constructor(public dialog: MatDialog,public dialogService: DialogService,public dialogAnimationsExampleDialog:DialogAnimationsExampleDialog,private route: ActivatedRoute, private itemService: ItemListService ,private router: Router, public store$:AppStore) { }
  ngOnInit(): void {
    this.store$.select(x=>x.itemToEdit).subscribe(x=>{
      if(x!=null){
        this.itemDTO = x
      }
     });

    this.itemId = this.route.snapshot.paramMap.get('itemId') || "";
    
    if (this.itemId != null) {

      this.itemService.getItem$(this.itemId).subscribe(
        x => {
          if (x.name == null) {
            this.router.navigate(['/items/']);
          }
          this.itemDTO = x;

          this.store$.setState(state => ({ ...state,itemToEdit: this.itemDTO }));
 

        
          if (x.itemsImageDTOs != null) {
            this.getImageUrl(x.itemsImageDTOs[0]?.imageURL)
          }
        },e=>{
          this.router.navigate(['/items/']);

        }
      );
    }
  }

  getImageUrl(url: string): void {
    
    this.imageURL= url?.length > 0
      ? `${this.apiURL}${url}`
      :'/assets/images/vapeItemPlaceHolder.png';
  }
  deleteItem(){
    localStorage.setItem("deleteNumber", 1+"");

    let a =this.dialogAnimationsExampleDialog.openDialog(Number.parseInt(this.itemId));
    if(this.route.snapshot.paramMap.get('itemId')=="0")
    this.itemService.getItem$(this.itemId).subscribe(
      x => {
           if(this.route.snapshot.paramMap.get('itemId')=="0"){
            this.router.navigate(['/items/']);
               }
      },e=>{
        if(this.route.snapshot.paramMap.get('itemId')=="0"){
          this.router.navigate(['/items/']);
        }
    
      }
    );
  }
  

show(): void {
   this.dialog.open(ProductEditDialogComponent, {
  });
}
 
}
