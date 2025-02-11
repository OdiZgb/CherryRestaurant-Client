import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BillDTO } from 'src/app/DTOs/BillDTO';
import { CategoryDTO } from 'src/app/DTOs/CategoryDTO';
import { ClientDebtDTO } from 'src/app/DTOs/ClientDebtDTO';
import { HistoryOfCashBill } from 'src/app/DTOs/HistoryOfCashBill';

@Injectable({
  providedIn: 'root'
})
export class BillsService {
  apiURL ='https://localhost:7260/bill/';
  apiURL2 ='https://localhost:7260/inventory/';
  apiURL3 ='https://localhost:7260/bill/';
  constructor(private httpClient:HttpClient) { }
  
  public addToBill(category:BillDTO): Observable<BillDTO>{
    return this.httpClient.post<BillDTO>(this.apiURL+'addToBill',category);
  }
  public addRefundToBill(category:BillDTO): Observable<BillDTO>{
    return this.httpClient.post<BillDTO>(this.apiURL+'addRefundToBill',category);
  }
  public getAllBills$():Observable<BillDTO[]>{
    return this.httpClient.get<BillDTO[]>(this.apiURL+"getAllBills");
  }
  public GetCash$():Observable<HistoryOfCashBill[]>{
    return this.httpClient.get<HistoryOfCashBill[]>(this.apiURL2+"GetCash");
  }
  public GetDeletedCash$():Observable<HistoryOfCashBill[]>{
    return this.httpClient.get<HistoryOfCashBill[]>(this.apiURL2+"GetDeletedCash");
  }
  public getAllClientDebts$():Observable<ClientDebtDTO[]>{
    return this.httpClient.get<ClientDebtDTO[]>(this.apiURL+"getAllClientDebts");
  }
  public completeDebt$(id:number):Observable<ClientDebtDTO>{
    return this.httpClient.put<ClientDebtDTO>(this.apiURL+"completeDebt/"+id,{});
  }

  public deleteCashBill$(id: number): Observable<any> {
      
    return this.httpClient.delete(this.apiURL3 + 'DeleteCashBill/'+id);
}
}
