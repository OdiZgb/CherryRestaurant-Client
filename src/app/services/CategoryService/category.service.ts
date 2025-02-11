import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryDTO } from 'src/app/DTOs/CategoryDTO';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apiURL ='https://localhost:7260/category/';
  constructor(private httpClient:HttpClient) { }

  public addCategory(category:CategoryDTO): Observable<CategoryDTO>{
    return this.httpClient.post<CategoryDTO>(this.apiURL+'addCategory',category);
  }
  public getAllICategories$():Observable<CategoryDTO[]>{
    return this.httpClient.get<CategoryDTO[]>(this.apiURL+"getAllGategorie");
  }
  public deleteCategory$(id: number): Observable<any> {
      
    return this.httpClient.delete(this.apiURL + 'deleteCategory/'+id);
}
}
