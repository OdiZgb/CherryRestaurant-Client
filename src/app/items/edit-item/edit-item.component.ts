import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { AppStore } from 'src/app/AppStore/AppStore';
import { CategoryDTO } from 'src/app/DTOs/CategoryDTO';
import { ItemDTO } from 'src/app/DTOs/ItemDTO';
import { ItemImageDTO } from 'src/app/DTOs/ItemImageDTO';
import { MarkaDTO } from 'src/app/DTOs/MarkaDTO';
import { PriceInDTO } from 'src/app/DTOs/PriceInDTO';
import { PriceOutDTO } from 'src/app/DTOs/PriceOutDTO';
import { TagDTO } from 'src/app/DTOs/TagDTO';
import { TagItemDTO } from 'src/app/DTOs/TagItemDTO';
import { CategoryService } from 'src/app/services/CategoryService/category.service';
import { ItemListService } from 'src/app/services/ItemsService/item-list.service';
import { MarkaService } from 'src/app/services/MarkaService/marka.service';
import { PriceService } from 'src/app/services/PriceService/price.service';
import { TagService } from 'src/app/services/TagService/tag.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {
  form!: FormGroup;
  isFileValid = false;
  selectedFile: File | undefined;
  categories$: Observable<CategoryDTO[]> | undefined;
  markas$: Observable<MarkaDTO[]> | undefined;
  itemDTO: ItemDTO = {} as ItemDTO;

  selected = new FormControl('', [Validators.required]);
  selectFormControl = new FormControl('valid', [Validators.required, Validators.pattern('valid')]);
  nativeSelectFormControl = new FormControl('valid', [
    Validators.required,
    Validators.pattern('valid'),
  ]);
  categories: CategoryDTO[] = [];
  markas: MarkaDTO[] = [];
  availableTags: TagDTO[] = [];
  selectedTags: any[] = [];
  
  @ViewChild('fileInput') fileInput: ElementRef | undefined;

  constructor(
    private fb: FormBuilder,
    private priceService: PriceService,
    private categoryService: CategoryService,
    private markaService: MarkaService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private itemService: ItemListService,
    private tagService: TagService,
    private router: Router,
    public store$: AppStore
  ) {}

  ngOnInit(): void {
    this.store$.select((x) => x.itemToEdit).subscribe((x) => {
      if (x != null) {
        this.itemDTO = x;
      }
    });

    this.categories$ = this.categoryService.getAllICategories$();
    this.markas$ = this.markaService.getAllIMarkas$();

    this.categoryService.getAllICategories$().subscribe((x) => {
      x.forEach((element) => {
        if (element != null) {
          this.categories.push(element);
        }
      });
    });

    this.markaService.getAllIMarkas$().subscribe((x) => {
      x.forEach((element) => {
        if (element != null) {
          this.markas.push(element);
        }
      });
    });
    this.tagService.getAllTags().subscribe(tags => {
      this.availableTags = tags;
    });

    // Simulate fetching the item to edit and its current tags
    this.selectedTags = this.itemDTO.tagItemDTOs?.map(tag => ({
      tagName: tag.tagName,
      tagId: tag.tagId
    })) || [];
    
    this.form = this.fb.group({
      itemName: [this.itemDTO?.name + '', [Validators.required, Validators.minLength(1)]],
      itemCategory: [this.itemDTO.categoryDTO?.name, [Validators.required, Validators.minLength(1)]],
      itemMarka: [this.itemDTO.markaDTO?.name, [Validators.required, Validators.minLength(1)]],
      priceIn: [this.itemDTO.priceInDTO?.price],
      priceOut: [this.itemDTO.priceOutDTO?.price],
      tags: [this.itemDTO.tagItemDTOs?.map(tag => tag.tagId) || []] // Use IDs for tags
    });
    this.tagService.getAllTags().subscribe(tags => {
      this.availableTags = tags;
    });
  }

  // Tags methods
  get tags(): FormArray {
    return this.form.get('tags') as FormArray;
  }

  addTag(): void {
    this.tags.push(this.fb.control(''));
  }

  removeTag(index: number): void {
    this.tags.removeAt(index);
  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length) {
      this.selectedFile = target.files[0];
      this.isFileValid = true;
    } else {
      this.isFileValid = false;
    }
  }

  onSubmit(): void {
    if (this.form?.valid) {
        // Retrieve selected category and brand
        let category = this.categories.find((x) => x.name == this.form.get('itemCategory')?.value);
        let marka = this.markas.find((x) => x.name == this.form.get('itemMarka')?.value);

        // Initialize the item object without tagItemDTOs to avoid cyclic reference
        let item = {
            id: this.itemDTO.id,
            name: this.form.get('itemName')?.value,
            barcode: this.form.get('itemBarcode')?.value,
            categoryDTO: category,
            markaDTO: marka,
            priceInDTO: this.itemDTO.priceInDTO,
            priceOutDTO: this.itemDTO.priceOutDTO,
            tagItemDTOs: []  // Initially set as empty array
        } as ItemDTO;

        // Now map tags to TagItemDTOs without referencing `item`
        const tagItemDTOs = this.form.value.tags.map((tagId: number) => ({
            tagId,
            itemId: item.id, // Only set the itemId instead of the full item reference
        })) as TagItemDTO[];

        // Assign the list of TagItemDTOs to the item after defining it
        item.tagItemDTOs = tagItemDTOs;

        // Call editItem service with the constructed item
        this.itemService.editItem$(item).subscribe((x) => {
            this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Item ' + x.name + ' has been updated'
            });

            // Update the store with the edited item
            this.store$.setState((state) => ({ ...state, itemToEdit: item }));

            // Handle priceIn if defined
            if (this.form.get('priceIn')?.value != null) {
                let priceIn: PriceInDTO = {
                    itemId: x.id,
                    price: this.form.get('priceIn')?.value,
                    item: x,
                    id: 0,
                    date: '',
                    expirationDate: ''
                };
                this.priceService.addPriceIn(priceIn).subscribe(
                    (response) => {
                        item.priceInDTO = priceIn;
                        this.store$.setState((state) => ({ ...state, itemToEdit: item }));
                    },
                    (error) => {}
                );
            }

            // Handle priceOut if defined
            if (this.form.get('priceOut')?.value != null) {
                let priceOut: PriceOutDTO = {
                    itemId: x.id,
                    price: this.form.get('priceOut')?.value,
                    item: x,
                    id: 0,
                    date: '',
                    expirationDate: ''
                };
                this.priceService.addPriceOut(priceOut).subscribe(
                    (response) => {
                        item.priceOutDTO = priceOut;
                        this.store$.setState((state) => ({ ...state, itemToEdit: item }));
                    },
                    (error) => {}
                );
            }
        });
    }
}

}
