import { AfterViewInit, ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { ItemDTO } from 'src/app/DTOs/ItemDTO';
import { MainSeviceService } from 'src/app/main-sevice.service';
import { ItemListService } from 'src/app/services/ItemsService/item-list.service';
import { CategoryService } from 'src/app/services/CategoryService/category.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit, AfterViewInit {
  apiURL = 'https://localhost:7260';
  scrollKey = 'itemsListScrollPosition'; // Key for localStorage

  constructor(
    public mainSeviceService: MainSeviceService,
    private cd: ChangeDetectorRef,
    public categoryService: CategoryService,
    private itemListService: ItemListService
  ) {}

  ngOnInit(): void {
    let filterActive = false;
    for (let value of Object.values(this.mainSeviceService.categoriesDict)) {
      if (value == true) {
        filterActive = true;
      }
    }

    if (filterActive == false) {
      this.itemListService.getAllItemsList$().subscribe((x) => {
        this.mainSeviceService.itemsList = x;
        console.log(x, 'items');
      });
    }

    this.categoryService.getAllICategories$().subscribe((x) => {
      this.cd.detectChanges();
      this.mainSeviceService.categories = x;
      this.cd.detectChanges();
    });
  }

  ngAfterViewInit(): void {
    // Restore the scroll position after the view is initialized
    const savedScrollPosition = localStorage.getItem(this.scrollKey);
    if (savedScrollPosition) {
      setTimeout(() => {
        window.scrollTo({ top: +savedScrollPosition, behavior: 'smooth' });
      }, 0);
    }
  }

  @HostListener('window:scroll')
  onScroll(): void {
    // Save the current scroll position on every scroll event
    localStorage.setItem(this.scrollKey, String(window.scrollY));
  }

  @HostListener('window:beforeunload')
  saveScrollPositionBeforeUnload(): void {
    // Backup scroll position before page unload
    localStorage.setItem(this.scrollKey, String(window.scrollY));
  }

  getImageUrl(item: ItemDTO): string {
    return item.itemsImageDTOs && item.itemsImageDTOs.length > 0 && item.itemsImageDTOs[0].imageURL
      ? `${this.apiURL}${item.itemsImageDTOs[0].imageURL}`
      : 'assets/images/vapeItemPlaceHolder.png';
  }
}
