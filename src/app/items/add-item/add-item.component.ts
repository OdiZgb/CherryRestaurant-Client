import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { CategoryDTO } from 'src/app/DTOs/CategoryDTO';
import { ItemDTO } from 'src/app/DTOs/ItemDTO';
import { ItemImageDTO } from 'src/app/DTOs/ItemImageDTO';
import { MarkaDTO } from 'src/app/DTOs/MarkaDTO';
import { PriceInDTO } from 'src/app/DTOs/PriceInDTO';
import { PriceOutDTO } from 'src/app/DTOs/PriceOutDTO';
import { TagDTO } from 'src/app/DTOs/TagDTO';  // Add the Tag DTO
import { TagItemDTO } from 'src/app/DTOs/TagItemDTO';
import { CategoryService } from 'src/app/services/CategoryService/category.service';
import { ItemListService } from 'src/app/services/ItemsService/item-list.service';
import { MarkaService } from 'src/app/services/MarkaService/marka.service';
import { PriceService } from 'src/app/services/PriceService/price.service';
import { TagService } from 'src/app/services/TagService/tag.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
})
export class AddItemComponent implements OnInit {
  form!: FormGroup;
  isFileValid = false;
  selectedFile: File | undefined;
  categories$: Observable<CategoryDTO[]> | undefined;
  markas$: Observable<MarkaDTO[]> | undefined;
  tags$: Observable<TagDTO[]> | undefined;  // Observable for tags
  categories: CategoryDTO[] = [];
  markas: MarkaDTO[] = [];
  tags: TagDTO[] = [];  // List of all available tags
  tagItem: TagItemDTO[] = [];
  selectedTags: TagDTO[] = [];  // Selected tags
  @ViewChild('fileInput') fileInput: ElementRef | undefined;

  constructor(
    private fb: FormBuilder,
    private itemService: ItemListService,
    private priceService: PriceService,
    private categoryService: CategoryService,
    private markaService: MarkaService,
    private tagService: TagService,  // Inject the TagService
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllICategories$();
    this.markas$ = this.markaService.getAllIMarkas$();
    this.tags$ = this.tagService.getAllTags();  // Fetch tags

    // Fetch categories
    this.categoryService.getAllICategories$().subscribe((x) => {
      x.forEach((element) => {
        if (element != null) {
          this.categories.push(element);
        }
      });
    });

    // Fetch markas
    this.markaService.getAllIMarkas$().subscribe((x) => {
      x.forEach((element) => {
        if (element != null) {
          this.markas.push(element);
        }
      });
    });

    // Fetch tags
    this.tagService.getAllTags().subscribe((tags) => {
      this.tags = tags;
    });

    this.form = this.fb.group({
      itemName: ['', [Validators.required, Validators.minLength(1)]],
      itemCategory: ['', [Validators.required, Validators.minLength(1)]],
      itemMarka: ['', [Validators.required, Validators.minLength(1)]],
      priceIn: [''],
      priceOut: [''],
      selectedTags: [[]],  // Add form control for selected tags
    });
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
      let category = this.categories.find(
        (x) => x.name == this.form.get('itemCategory')?.value
      );
      let marka = this.markas.find(
        (x) => x.name == this.form.get('itemMarka')?.value
      );

      // Get selected tags
      let selectedTags: number[] = this.form.get('selectedTags')?.value.map(
        (tag: TagDTO) => tag.id
      );

      console.log(selectedTags, "selectedTags");  // Log selected tags

      let MyTagList: TagItemDTO[] = [];

      // Populate MyTagList with TagItemDTOs
      selectedTags.forEach(element => {
        console.log(element, "element id");  // Log each element
        MyTagList.push({ tagId: element, itemId: 0 });  // Set itemId to 0 initially
      });

      console.log(MyTagList, "MyTagList after processing");  // Log MyTagList

      // Prepare the item object
      let item: ItemDTO = {
        id: 0,
        name: this.form.get('itemName')?.value,
        barcode: this.form.get('itemBarcode')?.value,
        categoryDTO: {
          id: category?.id,
        },
        markaDTO: {
          id: marka?.id,
        },
        tagItemDTOs: MyTagList,  // Include selected tags in the item payload
      } as ItemDTO;; 

      // Add the item using the ItemService
      this.itemService.addItem$(item).subscribe((x) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Item ' + x.name + ' has been added',
        });

        // Reset tagItem array
        this.tagItem = [];

        // Handle prices
        if (this.form.get('priceIn')?.value != null) {
          let priceIn: PriceInDTO = {
            itemId: x.id,
            price: this.form.get('priceIn')?.value,
            item: x,
            id: 0,
            date: '',
            expirationDate: '',
          };
          this.priceService.addPriceIn(priceIn).subscribe();
        }

        if (this.form.get('priceOut')?.value != null) {
          let priceOut: PriceOutDTO = {
            itemId: x.id,
            price: this.form.get('priceOut')?.value,
            item: x,
            id: 0,
            date: '',
            expirationDate: '',
          };
          this.priceService.addPriceOut(priceOut).subscribe();
        }

        // Handle file upload
        const file = this.fileInput?.nativeElement.files[0];
        const itemImageDTO: ItemImageDTO = {
          itemId: x.id,
          file: file,
          alterText: x.name,
          id: null,
          imageURL: ''
        };

        if (!file) {
          return;
        }

        if (this.selectedFile) {
          this.itemService.addImage$(itemImageDTO, this.selectedFile).subscribe();
        }
      });
    }
  }
}
