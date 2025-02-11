import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryDTO } from 'src/app/DTOs/InventoryDTO';
import { ItemDTO } from 'src/app/DTOs/ItemDTO';
import { InventoryService } from 'src/app/services/InventoryService/inventory.service';
import { MatDialog } from '@angular/material/dialog';
import { PrintBadcodesComponent } from './print-badcodes/print-badcodes.component';
import { EditInventoryComponent } from '../edit-inventory/edit-inventory.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-shipment-inhistory',
  templateUrl: './shipment-inhistory.component.html',
  styleUrls: ['./shipment-inhistory.component.scss']
})
export class ShipmentInhistoryComponent {
  inventories!: InventoryDTO[];
  buttonHovered: boolean = false;
  selectedCustomers!: InventoryDTO[];
  representatives!: ItemDTO[];
  statuses!: any[];
  showButton: boolean = false;
  loading: boolean = true;
  activityValues: number[] = [0, 100];
  inventoryItemBarcode: string | undefined;

  pageIndex = 0;  // Start from page index 0
  pageEvent: PageEvent | undefined;
  pageSize = 50;  // Set default page size to 50

  constructor(public dialog: MatDialog, private inventoryService: InventoryService, private router: Router) {}

  ngOnInit() {
    this.loadInventoryPage();
  }

  loadInventoryPage() {
    this.inventoryService.getAllInventoryPagination$(this.pageIndex + 1, this.pageSize).subscribe((customers) => {
      this.inventories = customers;
      this.loading = false;
      this.inventories.forEach((inventory) => (inventory.arrivalDate = new Date(<Date>inventory.arrivalDate)));

      // Sort inventories by arrivalDate in descending order
      this.inventories.sort((a, b) => b.arrivalDate.getTime() - a.arrivalDate.getTime());
    });
  }

  onRowClick(inventory: InventoryDTO) {
    this.router.navigate(['inventory/item/details/' + inventory.itemDTO?.barcode + '/' + inventory.barcode]);
  }

  calculateBarcode(inventory: any): string {
    return `${inventory.itemDTO.barcode}-${inventory.barcode}`;
  }

  handleButtonClick(event: MouseEvent, barcode: string) {
    event.stopPropagation(); // Prevent the click event from propagating to the parent <tr> element
    console.warn("Button clicked!");
    localStorage.setItem("qrCodeValue", barcode);
    this.dialog.open(PrintBadcodesComponent, {});
  }

  // Method to handle edit button click
  editRow(event: MouseEvent, inventory: InventoryDTO) {
    event.stopPropagation(); // Prevent row click event from being triggered
    console.log('Edit button clicked for inventory:', inventory);
    
    // Open dialog to edit inventory
    const dialogRef = this.dialog.open(EditInventoryComponent, {
      width: '600px',
      data: { inventory }  // Pass the inventory data to the edit dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the result, e.g., update the table with the edited inventory
        const index = this.inventories.findIndex(inv => inv.id === result.id);
        if (index !== -1) {
          this.inventories[index] = result;
        }
      }
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.loadInventoryPage();  // Load the inventory items for the selected page
    console.log("page number is: " + this.pageIndex);
  }
}
