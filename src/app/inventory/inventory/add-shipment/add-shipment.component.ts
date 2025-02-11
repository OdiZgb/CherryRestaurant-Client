import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, lastValueFrom, map, startWith } from 'rxjs';
import { EmployeeDTO } from 'src/app/DTOs/EmployeeDTO';
import { InventoryDTO } from 'src/app/DTOs/InventoryDTO';
import { ItemDTO } from 'src/app/DTOs/ItemDTO';
import { PriceInDTO } from 'src/app/DTOs/PriceInDTO';
import { PriceOutDTO } from 'src/app/DTOs/PriceOutDTO';
import { TraderDTO } from 'src/app/DTOs/TraderDTO';
import { MainSeviceService } from 'src/app/main-sevice.service';
import { InventoryService } from 'src/app/services/InventoryService/inventory.service';
import { ItemListService } from 'src/app/services/ItemsService/item-list.service';
import { AddShipmentDialogComponent } from '../add-shipment-dialog/add-shipment-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AppStore } from 'src/app/AppStore/AppStore';
import { ItemImageDTO } from 'src/app/DTOs/ItemImageDTO';
import { ShipmentImageDTO } from 'src/app/DTOs/ShipmentImageDTO';

@Component({
  selector: 'app-add-shipment',
  templateUrl: './add-shipment.component.html',
  styleUrls: ['./add-shipment.component.scss'],
  providers:[DialogService],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AddShipmentComponent {
  foundItem!: ItemDTO;
  foundTrader!: TraderDTO;
  foundEmployee!: EmployeeDTO;
  IsAddItemActive = false;
  myForm!: FormGroup;
  ProductController = new FormControl('');
  TraderController = new FormControl('');
  EmployeeController = new FormControl('');
  itemNames: Map<number, string> = new Map<number, string>();
  traderNames: Map<number, string> = new Map<number, string>();
  employeeNames: Map<number, string> = new Map<number, string>();
  constItemNames: Map<number, string> = new Map<number, string>();
  constEmployeeNames: Map<number, string> = new Map<number, string>();
  constTraderNames: Map<number, string> = new Map<number, string>();
  ItemDTOs: ItemDTO[] = [];
  ItemAddedDTOs: ItemDTO[] = [];
  ShipmentAddedDTOs: InventoryDTO[] = [];
  traderDTOs: TraderDTO[] = [];
  employeeDTOs: EmployeeDTO[] = [];
  filteredOptions!: Observable<string[]>;
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  foundProduct: boolean = false;
  foundItemId: number = -1;
  isFoundTrader: boolean = false;
  isFoundEmployee: boolean = false;
  foundTraderId: number = -1;
  foundEmployeeId: number = -1;
  InventoryDTOs: InventoryDTO[] = [];
  ref: DynamicDialogRef | undefined;
  isFileValid = false;
  selectedFile: File | undefined;
  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  currentEmployeeId=0;

  constructor( public store$:AppStore,public dialog: MatDialog,private mainsService: MainSeviceService, private formBuilder: FormBuilder, public inventoryService: InventoryService, private itemService: ItemListService, private messageService: MessageService, public dialogService: DialogService) { }
  a: string[] = [];
  
  openDialog(): void {
    const dialogRef = this.dialog.open(AddShipmentDialogComponent, {
      data: {ItemAddedDTOs: this.ItemAddedDTOs},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ItemAddedDTOs = result;
    });
}

  async ngOnInit(): Promise<void> {
    let emId = localStorage.getItem('employeeId');
    if(emId!=null){
      this.currentEmployeeId=Number.parseInt(emId);
    }
    this.mainsService.traders.subscribe(x => {
      this.traderDTOs = x;
      x.forEach(trader => {
        if (trader.id !== null && trader.name !== null) {
          this.traderNames.set(trader.id, trader.name);
          this.constTraderNames.set(trader.id, trader.name);
        }
      });
    });
    this.mainsService.employeeService.getAllEmployees$().subscribe(x => {
      this.employeeDTOs = x;
      x.forEach(employee => {
        if (employee.id == this.currentEmployeeId && employee.user.id !== null && employee.user.name !== null) {
          this.employeeNames.set(employee.user.id, employee.user.name);
          this.constEmployeeNames.set(employee.user.id, employee.user.name);
          this.EmployeeController.setValue(employee.user.name)
          this.EmployeeController.disable();
        }
      });
    });
    this.itemService.getAllItemsList$().subscribe(
      x => {
        this.ItemDTOs = x;
        x.forEach(element => {
          this.itemNames.set(element.id, element.name);
          this.constItemNames.set(element.id, element.name);
        });
      }
    );

    this.myForm = this.formBuilder.group({
      traderName: this.TraderController,
      employeeName: this.EmployeeController,
      arrivalDate: ['', [Validators.required, Validators.minLength(1)]],
    });
    this.ProductController.valueChanges.subscribe(
      x => {
        let foundItemByBarcode = this.ItemDTOs.find(s => s.barcode == x);

        if (foundItemByBarcode != null) {
          this.foundProduct = true;
          this.foundItemId = foundItemByBarcode.id;
          // this.ProductController.setValue(foundItemByBarcode.name); Remove this line
        }

        this.fiterDataBarcode(x);

        if (x == null || x?.length == 0) {
          this.itemNames = this.constItemNames;
        }
      }
    );

    this.TraderController.valueChanges.subscribe(x => {
      let foundTraderByName = this.traderDTOs.find(s => s.name == x);

      if (foundTraderByName != null && foundTraderByName.id != null) {
        this.isFoundTrader = true;
        this.foundTraderId = foundTraderByName.id;
      } else if (x == null || x == '') {
        this.traderNames = new Map(this.constTraderNames);
        return;
      }

      this.fiterDataTrader(x);
    });
    this.EmployeeController.valueChanges.subscribe(x => {
      let foundEmployeeByName = this.employeeDTOs.find(s => s.user.name == x);
      this.employeeDTOs.forEach(e=>{
        foundEmployeeByName = this.employeeDTOs.find(s => s.user.name == e.user.name);
      })
      if (foundEmployeeByName != null && foundEmployeeByName.id != null) {
        this.isFoundEmployee = true;
        this.foundEmployeeId = foundEmployeeByName.id;
      } else if (x == null || x == '') {
        this.employeeNames = new Map(this.constEmployeeNames);
        return;
      }

      this.fiterDataEmployee(x);
    });
    this.store$.select(x=>x.AddedShipmentToInventory).subscribe(
      z=>{
        console.log('innnv', z)
         this.addInv(z);
      }
    )
  }
  fiterDataBarcode(x: string | null): void {
    if (x == null) {
      return;
    }
    let Names: Map<number, string> = new Map<number, string>();

    this.itemNames?.forEach((val, k) => {
      if (val?.toLocaleLowerCase().includes(x?.toLocaleLowerCase())) {
        Names.set(k, val);
      }
    });
    this.itemNames = Names;
  }


  onSubmit(): void {
    if (this.myForm?.valid) {
      const arrivalDateValue = this.myForm.get('arrivalDate')?.value;

      this.ShipmentAddedDTOs.forEach(element => {
        element.arrivalDate = arrivalDateValue,
        element.employeeId = this.foundEmployeeId,
        element.patchId = 0,
        element.traderDTO = this.foundTrader,
        element.traderId = this.foundTraderId,
        element.employee = this.foundEmployee
      });
       this.inventoryService.addToInventory(this.ShipmentAddedDTOs).subscribe(
        x => {
        const file = this.fileInput?.nativeElement.files[0];

          const shipmentImageDTO = {
            barcode: x[0].barcode,
            file: file,
            alterText: x[0].barcode
          } as ShipmentImageDTO;


          if (this.selectedFile) {
  
            this.inventoryService.addImage$(shipmentImageDTO, this.selectedFile).subscribe(response => {
            }, error => {
            });
          };
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Shipment has been added' });

        }
      );

    } else {
    }
  }
  onOptionSelectedBarcode(event: any): void {
    const selectedValue = event.option.value;
    const selectedKey = this.getKeyFromValueBarcode(selectedValue);

    this.foundProduct = true;
    this.foundItemId = selectedKey || -1;
    // Assign the selected key to a variable or perform any other logic
    this.ItemDTOs.forEach(item => {
      if (item.id == this.foundItemId) {
        this.foundItem = item;
      }
    });

  }
  onOptionSelectedTrader(event: any): void {
    const selectedValue = event.option.value;
    const selectedKey = this.getKeyFromValueTrader(selectedValue);

    this.isFoundTrader = true;
    this.foundTraderId = selectedKey || -1;
    // Assign the selected key to a variable or perform any other logic
    this.traderDTOs.forEach(trader => {
      if (trader.id == this.foundTraderId) {
        this.foundTrader = trader;
      }
    });

  }
  onOptionSelectedEmployee(event: any): void {
    const selectedValue = event.option.value;
    const selectedKey = this.getKeyFromValueEmployee(selectedValue);

    this.isFoundEmployee = true;
    this.foundEmployeeId = selectedKey || -1;
    // Assign the selected key to a variable or perform any other logic
    this.employeeDTOs.forEach(employee => {
      if (employee.id == this.foundTraderId) {
        this.foundEmployee = employee;
      }
    });

  }
  getKeyFromValueBarcode(value: string): number | undefined {
    const entry = Array.from(this.itemNames.entries()).find(([key, val]) => val === value);
    return entry ? entry[0] : undefined;
  }
  getKeyFromValueTrader(value: string): number | undefined {
    const entry = Array.from(this.traderNames.entries()).find(([key, val]) => val === value);
    return entry ? entry[0] : undefined;
  }
  getKeyFromValueEmployee(value: string): number | undefined {
    const entry = Array.from(this.employeeNames.entries()).find(([key, val]) => val === value);
    return entry ? entry[0] : undefined;
  }
  fiterDataEmployee(x: string | null): void {
    if (x == null || x == '') {
      this.employeeNames = new Map(this.constEmployeeNames);
      return;
    }
    let Names: Map<number, string> = new Map<number, string>();

    this.employeeNames?.forEach((val, k) => {
      if (val?.toLocaleLowerCase().includes(x?.toLocaleLowerCase())) {
        Names.set(k, val);
      }
    });
    this.employeeNames = Names;
  }
  fiterDataTrader(x: string | null): void {
    if (x == null || x == '') {
      this.traderNames = new Map(this.constTraderNames);
      return;
    }
    let Names: Map<number, string> = new Map<number, string>();

    this.traderNames?.forEach((val, k) => {
      if (val?.toLocaleLowerCase().includes(x?.toLocaleLowerCase())) {
        Names.set(k, val);
      }
    });
    this.traderNames = Names;
  }
  addInv(x:InventoryDTO[]){
    x.forEach(x=>{
      x.itemDTO = this.ItemDTOs.find(w=>w.id === x.itemId) || null 
    })
    console.log(x);
    this.ShipmentAddedDTOs = x;
  }
  deleteItemFromTable(index: number){

    let  tempInventoryDTO: InventoryDTO [] = [];
    this.ShipmentAddedDTOs.forEach((element,i) => {
      if(i!=index){
        tempInventoryDTO.push(element);
      }
    });
    this.ShipmentAddedDTOs = tempInventoryDTO;

      this.store$.setState((state) => {
        return { ...state, AddedShipmentToInventory:  this.ShipmentAddedDTOs };
      });
    this.store$.select(x=>x.AddedShipmentToInventory).subscribe(x=>{
      console.log("deleted id of :"+index + " and now state is ",x);

    })
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
  
}

