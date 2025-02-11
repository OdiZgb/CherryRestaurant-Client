import { Component } from '@angular/core';
import { InventoryDTO } from 'src/app/DTOs/InventoryDTO';
import { ItemDTO } from 'src/app/DTOs/ItemDTO';
import { ItemQuantityDTO } from 'src/app/DTOs/ItemQuantityDTO';
import { InventoryService } from 'src/app/services/InventoryService/inventory.service';

@Component({
  selector: 'app-display-current-quantites',
  templateUrl: './display-current-quantites.component.html',
  styleUrls: ['./display-current-quantites.component.scss']
})
export class DisplayCurrentQuantitesComponent {
  itemQuantityDTO!: ItemQuantityDTO[];

 
  loading: boolean = true;

  constructor(private inventoryService: InventoryService) {}

  ngOnInit() {
  this.inventoryService.getCurrentQuantites$().subscribe((customers) => {
    this.itemQuantityDTO = customers;
    this.loading = false;
    
});
}

}
