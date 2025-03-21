import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TraderDTO } from 'src/app/DTOs/TraderDTO';

@Injectable({
  providedIn: 'root'
})
export class TradersService {

  apiURL = 'http://192.168.0.99:5213/trader/';
  constructor(private httpClient: HttpClient) { }

  public addTrader(TraderDTO: TraderDTO): Observable<TraderDTO> {
    return this.httpClient.post<TraderDTO>(this.apiURL + 'addTrader', TraderDTO);
  }
  public getTrader$(): Observable<TraderDTO[]> {
    return this.httpClient.get<TraderDTO[]>(this.apiURL + "getTrader");
  }
  public getAllTraders$(): Observable<TraderDTO[]> {
    return this.httpClient.get<TraderDTO[]>(this.apiURL + "getAllTraders");
  }
}