import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TagDTO } from 'src/app/DTOs/TagDTO';
import { MainSeviceService } from 'src/app/main-sevice.service';
import { CategoryService } from 'src/app/services/CategoryService/category.service';
import { ItemListService } from 'src/app/services/ItemsService/item-list.service';
import { MarkaService } from 'src/app/services/MarkaService/marka.service';
import { TagService } from 'src/app/services/TagService/tag.service';

@Component({
  selector: 'app-item-list-filter',
  templateUrl: './item-list-filter.component.html',
  styleUrls: ['./item-list-filter.component.scss']
})
export class ItemListFilterComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});
  public tags: TagDTO[] | undefined;
  searchControl: FormControl = new FormControl('');  // Search form control

  constructor(
    public markasService: MarkaService,
    public categoryService: CategoryService,
    public itemListService: ItemListService,
    public mainSeviceService: MainSeviceService,
    public tagService: TagService
  ) {}

  ngOnInit(): void {
    this.searchControl.valueChanges.subscribe(value => {
      this.applyFilters();
    });

    this.tagService.getAllTags().subscribe(x => {
      this.tags = x;
    });

    this.categoryService.getAllICategories$().subscribe(x => {
      this.mainSeviceService.categories = x;
      this.mainSeviceService.categories.forEach(element => {
        this.mainSeviceService.categoriesDict[element.id] = false;
        this.formGroup.addControl(element.name, new FormControl<string | null>(element.name));
        this.formGroup.controls[element.name].valueChanges.subscribe(x => {
          this.mainSeviceService.categoriesDict[element.id] = !this.mainSeviceService.categoriesDict[element.id];
          this.applyFilters();
        });
      });
    });

    this.markasService.getAllIMarkas$().subscribe(x => {
      this.mainSeviceService.markas = x;
      this.mainSeviceService.markas.forEach(element => {
        this.mainSeviceService.markasDict[element.id] = false;
        this.formGroup.addControl(element.name, new FormControl<string | null>(element.name));
        this.formGroup.controls[element.name].valueChanges.subscribe(x => {
          this.mainSeviceService.markasDict[element.id] = !this.mainSeviceService.markasDict[element.id];
          this.applyFilters();
        });
      });
    });

    this.tagService.getAllTags().subscribe(x => {
      this.mainSeviceService.tags = x;
      this.mainSeviceService.tags.forEach(element => {
        this.mainSeviceService.tagsDict[element.id] = false;
        this.formGroup.addControl(element.title, new FormControl<string | null>(element.title));
        this.formGroup.controls[element.title].valueChanges.subscribe(x => {
          this.mainSeviceService.tagsDict[element.id] = !this.mainSeviceService.tagsDict[element.id];
          this.applyFilters();
        });
      });
    });
  }

  applyFilters() {
    let selectedCategories: number[] = [];
    let selectedMarkas: number[] = [];
    let selectedTags: number[] = [];
    let searchText = this.searchControl.value?.toLowerCase().trim() || '';  // Get the search text

    // Check selected categories
    for (let [key, value] of Object.entries(this.mainSeviceService.categoriesDict)) {
      if (value) {
        selectedCategories.push(Number.parseInt(key));
      }
    }

    // Check selected markas
    for (let [key, value] of Object.entries(this.mainSeviceService.markasDict)) {
      if (value) {
        selectedMarkas.push(Number.parseInt(key));
      }
    }

    // Check selected tags
    for (let [key, value] of Object.entries(this.mainSeviceService.tagsDict)) {
      if (value) {
        selectedTags.push(Number.parseInt(key));
      }
    }

    // Apply filters
    this.itemListService.getAllItemsList$().subscribe(items => {
      this.mainSeviceService.itemsList = items.filter(item =>
        // Category filter
        (selectedCategories.length === 0 || (item.categoryDTO && selectedCategories.includes(item.categoryDTO.id))) &&
        // Marka filter
        (selectedMarkas.length === 0 || (item.markaDTO && selectedMarkas.includes(item.markaDTO.id))) &&
        // Tag filter
        (selectedTags.length === 0 || item.tagsDTO?.some(tag => tag.id !== undefined && selectedTags.includes(tag.id))) &&
        // Search filter by name
        (searchText === '' || item.name.toLowerCase().includes(searchText))
      );
    });
  }
}
