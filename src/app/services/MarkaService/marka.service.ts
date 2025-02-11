import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MarkaDTO } from 'src/app/DTOs/MarkaDTO';

@Injectable({
  providedIn: 'root'
})
export class MarkaService {  

apiURL ='https://localhost:7260/marka/';
constructor(private httpClient:HttpClient) { }

public addMarka(marka:MarkaDTO): Observable<MarkaDTO>{
  return this.httpClient.post<MarkaDTO>(this.apiURL+'addMarka',marka);
}
public getAllIMarkas$():Observable<MarkaDTO[]>{
  return this.httpClient.get<MarkaDTO[]>(this.apiURL+"getAllMarkas");
}
public deleteMarka$(id: number): Observable<any> {
      
  return this.httpClient.delete(this.apiURL + 'deleteMarka/'+id);
}
}
