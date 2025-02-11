import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InventoryDTO } from 'src/app/DTOs/InventoryDTO';
import { ItemQuantityDTO } from 'src/app/DTOs/ItemQuantityDTO';
import { ShipmentImageDTO } from 'src/app/DTOs/ShipmentImageDTO';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  apiURL ='https://localhost:7260/inventory/';
  constructor(private httpClient:HttpClient) { }
  
  public addToInventory(inventoryDTOs:InventoryDTO[]): Observable<InventoryDTO[]>{
    return this.httpClient.post<InventoryDTO[]>(this.apiURL+'addToInventory',inventoryDTOs);
  }
  public getAllInventory$():Observable<InventoryDTO[]>{
    return this.httpClient.get<InventoryDTO[]>(this.apiURL+"getAllInventory");
  }
  public getAllInventoryPagination$(pageIndex: number, pageSize: number): Observable<InventoryDTO[]> {
    return this.httpClient.get<InventoryDTO[]>(
      `${this.apiURL}getAllInventoryPagination?pageNumber=${pageIndex}&pageSize=${pageSize}`
    );
  }
  
  public getAllInventoryByBarcode$(barcode:string):Observable<InventoryDTO[]>{
    return this.httpClient.get<InventoryDTO[]>(this.apiURL+"getAllInventoryByBarcode/"+barcode);
  }
  public getInventoryImage$(barcode:string):Observable<string>{
    return this.httpClient.get<string>(this.apiURL+"getInventoryImage/"+barcode);
  }
  public getCurrentQuantites$():Observable<ItemQuantityDTO[]>{
    return this.httpClient.get<ItemQuantityDTO[]>(this.apiURL+"getCurrentQuantites");
  }
  public addImage$(itemImageDTO: ShipmentImageDTO, fileToUpload: File): Observable<any> {
    const formData = new FormData();

    formData.append('barcode', itemImageDTO.barcode+"");
    formData.append('AlterText', itemImageDTO.alterText || '');
    formData.append('file', fileToUpload, fileToUpload.name);

    return this.httpClient.post<any>(this.apiURL + 'addShipmentImage', formData);
  }
  public editInventoryQuantity(id: number, quantityDTO: any): Observable<any> {
    return this.httpClient.put<any>(`${this.apiURL}editInventoryQuantity/${id}`, quantityDTO);
  }
}
