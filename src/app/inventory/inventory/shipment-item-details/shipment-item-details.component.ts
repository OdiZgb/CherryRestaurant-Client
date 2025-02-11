import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppStore } from 'src/app/AppStore/AppStore';
import { InventoryDTO } from 'src/app/DTOs/InventoryDTO';
import { ItemDTO } from 'src/app/DTOs/ItemDTO';
import { TraderDTO } from 'src/app/DTOs/TraderDTO';
import { InventoryService } from 'src/app/services/InventoryService/inventory.service';
import { ItemListService } from 'src/app/services/ItemsService/item-list.service';

@Component({
  selector: 'app-shipment-item-details',
  templateUrl: './shipment-item-details.component.html',
  styleUrls: ['./shipment-item-details.component.scss']
})
export class ShipmentItemDetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute, private itemService: ItemListService,private inventoryService: InventoryService ,private router: Router, public store$:AppStore) { }
  itemBarcode = "";
  invBarcode = "";
  inv!:InventoryDTO;
  item!:ItemDTO;
  trader!:TraderDTO| null ;
  imageURL:string = "";
  itemImageURL:string = "";
  apiURL ='https://localhost:7260';

  ngOnInit(): void {
    this.invBarcode = this.route.snapshot.paramMap.get('invBarcode') || "";
    this.itemBarcode = this.route.snapshot.paramMap.get('itemBarcode') || "";

    this.inventoryService.getAllInventoryByBarcode$(this.invBarcode).subscribe(x=>{

      x.map(s=>{if(s.itemDTO?.barcode == this.itemBarcode) {this.item  = s.itemDTO;
        this.itemService.getItem$(s.itemDTO.id+"").subscribe(w=>{
        this.itemImageURL = this.getImageUrl(w);
 
       })
      }});
      x.map(s=>{if(s.barcode == this.invBarcode && s.itemDTO?.barcode == this.itemBarcode){ 
          this.trader =s.traderDTO;
      this.imageURL = this.apiURL+"/"+x[0].imagePath
          
        console.log(s,'trader')
        this.inv  = s}});

    

    })
    }
    getImageUrl(item: ItemDTO): string {
    
      return item.itemsImageDTOs && item.itemsImageDTOs.length > 0 && item.itemsImageDTOs[0].imageURL
        ? `${this.apiURL}${item.itemsImageDTOs[0].imageURL}`
        :'assets/images/vapeItemPlaceHolder.png';
    }
}
