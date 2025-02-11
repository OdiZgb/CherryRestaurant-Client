import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MainSeviceService } from '../main-sevice.service';
import { CategoryService } from '../services/CategoryService/category.service';
import { ItemListService } from '../services/ItemsService/item-list.service';
import { CategoryDTO } from '../DTOs/CategoryDTO';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  apiURL ='https://localhost:7260';

  constructor(public mainSeviceService:MainSeviceService ,private cd: ChangeDetectorRef,public categoryService:CategoryService, private itemListService:ItemListService) { }

  ngOnInit(): void {

    this.categoryService.getAllICategories$().subscribe(
      x=>{
        this.mainSeviceService.categories=x;
      }
    )

  }
  getImageUrl(category: CategoryDTO): string {
    
    return category.ImageURL && category.ImageURL.length > 0
      ? `${this.apiURL}${category.ImageURL}`
      :'assets/images/categoriesCover.jpg';
  }
}
