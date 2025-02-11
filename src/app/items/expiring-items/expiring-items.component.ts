import { Component, OnInit } from '@angular/core';
import { InventoryDTO } from 'src/app/DTOs/InventoryDTO';
import { InventoryService } from 'src/app/services/InventoryService/inventory.service';

@Component({
  selector: 'app-expiring-items',
  templateUrl: './expiring-items.component.html',
  styleUrls: ['./expiring-items.component.scss']
})
export class ExpiringItemsComponent implements OnInit {
  expiringInventories!: InventoryDTO[];
  loading: boolean = true;

  constructor(private inventoryService: InventoryService) {}

  ngOnInit() {
    this.inventoryService.getAllInventory$().subscribe((inventories) => {
      const currentDate = new Date();
      this.expiringInventories = inventories.filter(inventory => {
        const expirationDate = new Date(inventory.expirationDate);
        const oneMonthLater = new Date(currentDate);
        oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
        return expirationDate <= oneMonthLater && expirationDate >= currentDate;
      });
      this.loading = false;
    });
  }
}
