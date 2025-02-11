import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PriceInDTO } from 'src/app/DTOs/PriceInDTO';
import { PriceOutDTO } from 'src/app/DTOs/PriceOutDTO';

@Injectable({
  providedIn: 'root'
})
export class PriceService {
  apiURL ='https://localhost:7260/price/';
  constructor(private httpClient:HttpClient) { }
  
  public addPriceIn(priceInDTO:PriceInDTO): Observable<PriceInDTO>{
    return this.httpClient.post<PriceInDTO>(this.apiURL+'addPriceIn',priceInDTO);
  }
  public addPriceOut(priceOutDTO:PriceOutDTO): Observable<PriceOutDTO>{
    return this.httpClient.post<PriceOutDTO>(this.apiURL+'addPriceOut',priceOutDTO);
  }
  //implement pricein get http get requests
}
