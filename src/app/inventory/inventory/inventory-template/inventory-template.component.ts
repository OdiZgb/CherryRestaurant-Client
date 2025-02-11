import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InventoryDTO } from 'src/app/DTOs/InventoryDTO';
import { InventoryService } from 'src/app/services/InventoryService/inventory.service';
import { EmployeeDTO } from 'src/app/DTOs/EmployeeDTO';
import { TraderDTO } from 'src/app/DTOs/TraderDTO';
import { MainSeviceService } from 'src/app/main-sevice.service';
import { EditInventoryDialogComponent } from 'src/app/helpers/edit-inventory-dialog/edit-inventory-dialog.component';

@Component({
  selector: 'app-inventory-template',
  templateUrl: './inventory-template.component.html',
  styleUrls: ['./inventory-template.component.scss']
})
export class InventoryTemplateComponent implements OnInit {
  apiURL = 'https://localhost:7260';
  barcode = '';
  inventoryDTOs: InventoryDTO[] = [];
  imageURL = '';
  myForm!: FormGroup;
  employeeDTO: EmployeeDTO | null = null;
  traderDTOs: TraderDTO[] = [];
  traderNames: Map<number, string> = new Map<number, string>();
  constTraderNames: Map<number, string> = new Map<number, string>();
  TraderController = new FormControl('');
  EmployeeController = new FormControl('');
  currentEmployeeId = 0;
  foundTraderId: number = -1; // Initialize as number

  constructor(
    private route: ActivatedRoute, 
    private inventoryService: InventoryService,
    private cdRef: ChangeDetectorRef, 
    private dialog: MatDialog,
    private mainsService: MainSeviceService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.barcode = params.get('barcode') || '';
    });

    this.inventoryService.getInventoryImage$(this.barcode).subscribe(() => {
      this.cdRef.detectChanges();
    });

    this.inventoryService.getAllInventoryByBarcode$(this.barcode).subscribe(x => {
      this.inventoryDTOs = x;
      this.imageURL = `${this.apiURL}/${x[0].imagePath}`;
    });

    this.initializeForm();
    this.setEmployeeFromStorage();
    this.loadTraders();
  }

  initializeForm(): void {
    this.myForm = this.formBuilder.group({
      traderName: this.TraderController,
      employeeName: this.EmployeeController
    });
  }

  setEmployeeFromStorage(): void {
    this.currentEmployeeId = parseInt(localStorage.getItem('employeeId') || '0', 10);

    this.mainsService.employeeService.getAllEmployees$().subscribe(employees => {
      this.employeeDTO = employees.find(e => e.id === this.currentEmployeeId) || null;
      if (this.employeeDTO) {
        this.EmployeeController.setValue(this.employeeDTO.user.name); // Set the employee's name
        this.EmployeeController.disable(); // Disable the field to make it non-editable
      } else {
        console.error('Employee not found for ID:', this.currentEmployeeId);
      }
    });
  }

  loadTraders(): void {
    this.mainsService.traders.subscribe(traders => {
      this.traderDTOs = traders;
      traders.forEach(trader => {
        if (trader.id !== null && trader.name !== null) {
          this.traderNames.set(trader.id, trader.name);
          this.constTraderNames.set(trader.id, trader.name);
        }
      });
    });

    this.TraderController.valueChanges.subscribe(traderName => {
      let foundTrader = this.traderDTOs.find(trader => trader.name === traderName);

      if (foundTrader && foundTrader.id !== null) {
        this.foundTraderId = foundTrader.id; // Set the found trader's ID here
      } else if (traderName === null || traderName === '') {
        this.traderNames = new Map(this.constTraderNames);
      }

      this.filterDataTrader(traderName);
    });
  }

  filterDataTrader(traderName: string | null): void {
    if (traderName === null || traderName === '') {
      this.traderNames = new Map(this.constTraderNames);
      return;
    }
    let Names: Map<number, string> = new Map<number, string>();

    this.traderNames.forEach((val, k) => {
      if (val.toLocaleLowerCase().includes(traderName.toLocaleLowerCase())) {
        Names.set(k, val);
      }
    });
    this.traderNames = Names;
  }

  openEditDialog(inventory: InventoryDTO): void {
    const dialogRef = this.dialog.open(EditInventoryDialogComponent, {
      data: inventory
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.inventoryDTOs.findIndex(inv => inv.barcode === result.barcode);
        if (index !== -1) {
          this.inventoryDTOs[index] = result;
        }
      }
    });
  }
}
