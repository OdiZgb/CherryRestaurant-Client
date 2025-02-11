import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Observable, map, startWith } from 'rxjs';
import { ItemDTO } from 'src/app/DTOs/ItemDTO';
import { PriceInDTO } from 'src/app/DTOs/PriceInDTO';
import { ItemListService } from 'src/app/services/ItemsService/item-list.service';
import { PriceService } from 'src/app/services/PriceService/price.service';
import { PriceOutDTO } from '../DTOs/PriceOutDTO';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.scss']
})
export class PricesComponent {
  myForm!: FormGroup;
  ProductController = new FormControl('');
  itemNames: Map<number, string> = new Map<number, string>();
  constNames: Map<number, string> = new Map<number, string>();
  ItemDTOs:ItemDTO[]=[];
  filteredOptions!: Observable<string[]>;
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  foundProduct: boolean = false;
  foundItemId: number= -1;

  constructor(private formBuilder: FormBuilder, private priceService: PriceService, private itemService: ItemListService, private messageService: MessageService) {}
   a:string[]=[];

  ngOnInit(): void {
    this.itemService.getAllItemsList$().subscribe(
      x => {
        this.ItemDTOs=x;
        x.forEach(element => {
          this.itemNames.set(element.id, element.name);
          this.constNames.set(element.id, element.name);
        });
      }
    );
 
    this.myForm = this.formBuilder.group({
      barcodeName: [''],
      priceIn: ['', [Validators.required, Validators.minLength(1)]],
      priceOut: ['', [Validators.required, Validators.minLength(1)]],
    });
    this.ProductController.valueChanges.subscribe(
      x=>{
        let foundItemByBarcode = this.ItemDTOs.find(s=>s.barcode==x)
        if(foundItemByBarcode!=null){
          this.foundProduct=true;
          this.foundItemId=foundItemByBarcode.id;
          this.ProductController.setValue(foundItemByBarcode.name);
        }
        this.fiterData(x);
      if(x==null||x?.length==0){
        this.itemNames=this.constNames
      }
      }
    );
  }
  fiterData(x: string | null): void {
    if(x==null){
      return;
    }
  let Names: Map<number, string> = new Map<number, string>();

    this.itemNames?.forEach((val,k) => {
      if(val?.toLocaleLowerCase().includes(x?.toLocaleLowerCase())){
        Names.set(k,val);
      }
    });
    this.itemNames=Names;
  }

  onSubmit(): void {
    if (this.myForm?.valid) {
      const priceInValue = this.myForm.get('priceIn')?.value;
      const priceOutValue = this.myForm.get('priceOut')?.value;

      let priceInToAdd: PriceInDTO = {
        id: 0,
        itemId: this.foundItemId,
        price: priceInValue,
        item: {
          id: this.foundItemId,
          name: '',
        } as ItemDTO,
        date: '',
        expirationDate: ''
      };
      let priceOutToAdd: PriceOutDTO = {
        id: 0,
        itemId: this.foundItemId,
        price: priceOutValue,
        item: {
          id: this.foundItemId,
          name: '',
        } as ItemDTO,
        date: '',
        expirationDate: ''
      };

      this.priceService.addPriceIn(priceInToAdd).subscribe(
        x => {
           this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Price in'+x.price+' has been added'});

        },
        error => {
        }
      );
      this.priceService.addPriceOut(priceOutToAdd).subscribe(
        x => {
           this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Price out'+x.price+' has been added'});

        },
        error => {
        }
      );

    } else {
    }
  }
  onOptionSelected(event: any): void {
    const selectedValue = event.option.value;
    const selectedKey = this.getKeyFromValue(selectedValue);
    this.foundProduct=true;
    this.foundItemId=selectedKey || -1;
    // Assign the selected key to a variable or perform any other logic
  }
  getKeyFromValue(value: string): number | undefined {
    const entry = Array.from(this.itemNames.entries()).find(([key, val]) => val === value);
    return entry ? entry[0] : undefined;
  }
}
