import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { MarkaDTO } from 'src/app/DTOs/MarkaDTO';
import { MainSeviceService } from 'src/app/main-sevice.service';
import { MarkaService } from 'src/app/services/MarkaService/marka.service';

@Component({
  selector: 'app-delete-marka-dialog',
  templateUrl: './delete-marka-dialog.component.html',
  styleUrls: ['./delete-marka-dialog.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],

})
export class DeleteMarkaDialogComponent {
  markaId =0;
  private markaIdSource = new BehaviorSubject<number>(0);
  currentItemId = this.markaIdSource.asObservable();
  openDialog(markaId:number): void {
    localStorage.setItem("MarkaIsDeleting","true");
    localStorage.setItem("MarkaIsDeletingId",""+markaId);
    this.markaId = markaId;
    this.dialog.open(DeleteMarkaDialogComponent, {
      width: '250px',
        enterAnimationDuration:"0ms",
        exitAnimationDuration:"0ms"
    });
    this.markaId = markaId;

  }
  constructor(public mainSeviceService:MainSeviceService,public dialogRef: MatDialogRef<DeleteMarkaDialogComponent>,public dialog: MatDialog,  public markaService:MarkaService) {}


  
  delete(){
    if(localStorage.getItem("MarkaIsDeleting")=="true"){

    let a :MarkaDTO[]=[];
    
      let markaId = Number.parseInt(localStorage.getItem("MarkaIsDeletingId") || '');
      this.mainSeviceService.markas.forEach(element => {
         if(element.id != markaId){
          a.push(element);
         } 
        }
        
    );
    this.mainSeviceService.markas = a;
    
    this.markaService.deleteMarka$(markaId).subscribe(x=>{
    });
      localStorage.setItem("MarkaIsDeleting","false");
    }

  }

}
