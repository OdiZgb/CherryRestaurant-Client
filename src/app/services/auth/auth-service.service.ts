import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { PriceInDTO } from 'src/app/DTOs/PriceInDTO';
import { UserDTO } from 'src/app/DTOs/UserDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  public loggedInSubject = new BehaviorSubject<boolean>(false); // Starting with not logged in
   
  apiURL ='https://localhost:7260/user/';
  constructor(private httpClient:HttpClient) { }
  
  public login(userDTO:UserDTO): Observable<UserDTO>{
    return this.httpClient.post<UserDTO>(this.apiURL+'login',userDTO);
  }
}
