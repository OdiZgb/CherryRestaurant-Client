import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { DialogAnimationsExampleDialog } from '../Templates/dialog-animations-example-dialog/dialog-animations-example-dialog.component';
import { MainSeviceService } from '../main-sevice.service';
import { CategoryService } from '../services/CategoryService/category.service';
import { ItemListService } from '../services/ItemsService/item-list.service';
import { MarkaDTO } from '../DTOs/MarkaDTO';
import { MarkaService } from '../services/MarkaService/marka.service';

@Component({
  selector: 'app-markas',
  templateUrl: './markas.component.html',
  styleUrls: ['./markas.component.scss']
})
export class MarkasComponent {
  apiURL ='https://localhost:7260';

  constructor(public mainSeviceService:MainSeviceService ,private cd: ChangeDetectorRef,public markaService:MarkaService, private itemListService:ItemListService) { }


  ngOnInit(): void {

    this.markaService.getAllIMarkas$().subscribe(
      x=>{
        this.mainSeviceService.markas=x;
      }
    )}
    
  getImageUrl(marka: MarkaDTO): string {
    
    return marka.ImageURL && marka.ImageURL.length > 0
      ? `${this.apiURL}${marka.ImageURL}`
      :'assets/images/markasCover.jpg';
  }
}
