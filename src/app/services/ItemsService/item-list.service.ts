import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ItemDTO } from 'src/app/DTOs/ItemDTO';
import { ItemImageDTO } from 'src/app/DTOs/ItemImageDTO';

@Injectable({
  providedIn: 'root'
})
export class ItemListService {
  
  apiURL ='https://localhost:7260/item/';
  constructor(private httpClient:HttpClient) { }

  public getAllItemsList$():Observable<ItemDTO[]>{
    return this.httpClient.get<ItemDTO[]>(this.apiURL+'getAllItems');
  }
  public getItem$(id:string):Observable<ItemDTO>{
    return this.httpClient.get<ItemDTO>(this.apiURL+'getItem/'+id);
  }
  public addItem$(item: ItemDTO): Observable<ItemDTO> {
    return this.httpClient.post<ItemDTO>(this.apiURL + 'addItem', item);
  }
  public editItem$(item: ItemDTO): Observable<ItemDTO> {
    return this.httpClient.put<ItemDTO>(this.apiURL + 'editItem', item);
  }
  public deleteItem$(id: number): Observable<any> {
      
      return this.httpClient.delete(this.apiURL + 'deleteItem/'+id);
  }
  public addImage$(itemImageDTO: ItemImageDTO, fileToUpload: File): Observable<any> {
    const formData = new FormData();

    formData.append('ItemId', itemImageDTO.itemId.toString());
    formData.append('AlterText', itemImageDTO.alterText || '');
    formData.append('file', fileToUpload, fileToUpload.name);

    return this.httpClient.post<any>(this.apiURL + 'addItemImage', formData);
  }
}
