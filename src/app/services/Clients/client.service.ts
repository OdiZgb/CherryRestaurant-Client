import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientDTO } from 'src/app/DTOs/ClientDTO';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  apiURL ='https://localhost:7260/client/';
  constructor(private httpClient:HttpClient) { }

  public addClient(client:ClientDTO): Observable<ClientDTO>{
    return this.httpClient.post<ClientDTO>(this.apiURL+'addClient',client);
  }
  public getAllClients$():Observable<ClientDTO[]>{
    return this.httpClient.get<ClientDTO[]>(this.apiURL+"getAllClients");
  }
}
