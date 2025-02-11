import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { CategoryDTO } from 'src/app/DTOs/CategoryDTO';
import { MainSeviceService } from 'src/app/main-sevice.service';
import { CategoryService } from 'src/app/services/CategoryService/category.service';

@Component({
  selector: 'app-delete-category-dialog',
  templateUrl: './delete-category-dialog.component.html',
  styleUrls: ['./delete-category-dialog.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],

})
export class DeleteCategoryDialogComponent {
  categoryId =0;
  private categoryIdSource = new BehaviorSubject<number>(0);
  currentItemId = this.categoryIdSource.asObservable();
  openDialog(categoryId:number): void {
    localStorage.setItem("CategoryIsDeleting","true");
    localStorage.setItem("CategoryIsDeletingId",""+categoryId);
    this.categoryId = categoryId;
    this.dialog.open(DeleteCategoryDialogComponent, {
      width: '250px',
        enterAnimationDuration:"0ms",
        exitAnimationDuration:"0ms"
    });
    this.categoryId = categoryId;

  }
  constructor(public mainSeviceService:MainSeviceService,public dialogRef: MatDialogRef<DeleteCategoryDialogComponent>,public dialog: MatDialog,  public categoryService:CategoryService) {}


  
  delete(){
    if(localStorage.getItem("CategoryIsDeleting")=="true"){

    let a :CategoryDTO[]=[];
    
      let categoryId = Number.parseInt(localStorage.getItem("CategoryIsDeletingId") || '');
      this.mainSeviceService.categories.forEach(element => {
         if(element.id != categoryId){
          a.push(element);
         } 
        }
        
    );
    this.mainSeviceService.categories = a;
    
    this.categoryService.deleteCategory$(categoryId).subscribe(x=>{
    });
      localStorage.setItem("CategoryIsDeleting","false");
    }

  }

}
