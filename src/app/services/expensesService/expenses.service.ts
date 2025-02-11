import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExpenseCategoryDTO } from 'src/app/DTOs/ExpenseCategoryDTO';
import { ExpenseItemDTO } from 'src/app/DTOs/ExpenseItemDTO';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  apiURL ='https://localhost:7260/expense/';
  constructor(private httpClient:HttpClient) { }

  public addExpenseCategory(expenseCategoryDTO:ExpenseCategoryDTO): Observable<ExpenseCategoryDTO>{
    return this.httpClient.post<ExpenseCategoryDTO>(this.apiURL+'addExpenseCategory',expenseCategoryDTO);
  }
  public addExpenseItem(expenseItemDTO:ExpenseItemDTO): Observable<ExpenseItemDTO>{
    return this.httpClient.post<ExpenseItemDTO>(this.apiURL+'addExpenseItem',expenseItemDTO);
  }
  public getAllExpenseCategories$():Observable<ExpenseCategoryDTO[]>{
    return this.httpClient.get<ExpenseCategoryDTO[]>(this.apiURL+"getAllExpenseCategories");
  }
}