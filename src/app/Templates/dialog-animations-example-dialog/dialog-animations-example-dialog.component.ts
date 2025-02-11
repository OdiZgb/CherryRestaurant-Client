import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { ItemDTO } from 'src/app/DTOs/ItemDTO';
import { MainSeviceService } from 'src/app/main-sevice.service';
import { ItemListService } from 'src/app/services/ItemsService/item-list.service';
@Component({
  selector: 'app-dialog-animations-example-dialog',
  templateUrl: './dialog-animations-example-dialog.component.html',
  styleUrls: ['./dialog-animations-example-dialog.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})

export class DialogAnimationsExampleDialog {
  itemId =0;
   private itemIdSource = new BehaviorSubject<number>(0);
  currentItemId = this.itemIdSource.asObservable();
  openDialog(itemId: number): void {
      localStorage.setItem("ItemIsDeleting", "true");
    localStorage.setItem("ItemIsDeletingId", "" + itemId);

    this.itemId = itemId;
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      enterAnimationDuration: "0ms",
      exitAnimationDuration: "0ms"
    });
    this.itemId = itemId;

  }

  constructor(public mainSeviceService: MainSeviceService, public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>, public dialog: MatDialog, public itemService: ItemListService, private route: ActivatedRoute, private router: Router) { }
  delete() {
    let a = localStorage.getItem("deleteNumber");
  
    if (a == "1") {
      this.deleteAndMoveTo();
      this.dialogRef.close(); // Close the dialog
      return;
    }
  
    if (localStorage.getItem("ItemIsDeleting") == "true") {
      let updatedItems: ItemDTO[] = [];
  
      let itemId = Number.parseInt(localStorage.getItem("ItemIsDeletingId") || '');
      this.mainSeviceService.itemsList.forEach(element => {
        if (element.id != itemId) {
          updatedItems.push(element);
        }
      });
      this.mainSeviceService.itemsList = updatedItems; // Update the list locally
      this.itemService.deleteItem$(itemId).subscribe({
        next: () => {
          this.dialogRef.close(); // Close the dialog after successful deletion
        },
        error: (e) => {
          console.error(e);
          this.dialogRef.close(); // Ensure the dialog closes even if there's an error
        }
      });
      localStorage.setItem("ItemIsDeleting", "false");
    }
  }
  
  
  
  deleteAndMoveTo() {
    if (localStorage.getItem("ItemIsDeleting") == "true") {
      let itemId = Number.parseInt(localStorage.getItem("ItemIsDeletingId") || '');
      this.itemService.deleteItem$(itemId).subscribe({
        next: () => {
          localStorage.setItem("ItemIsDeleting", "false");
          this.dialogRef.close(); // Close the dialog after successful deletion
        },
        error: (e) => {
          console.error(e);
          this.dialogRef.close(); // Ensure the dialog closes even if there's an error
        }
      });
    }
  }
  
}