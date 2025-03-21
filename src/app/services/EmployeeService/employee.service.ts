import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeDTO } from 'src/app/DTOs/EmployeeDTO';
import { PayLaterDTO } from 'src/app/DTOs/PayLaterDTO';
import { SalaryDTO } from 'src/app/DTOs/SalaryDTO';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  apiURL = 'http://192.168.0.99:5213/employee/';
  constructor(private httpClient: HttpClient) { }

  public addEmployee(EmployeeDTO: EmployeeDTO): Observable<EmployeeDTO> {
    return this.httpClient.post<EmployeeDTO>(this.apiURL + 'addEmployee', EmployeeDTO);
  }
  public getEmployee$(): Observable<EmployeeDTO[]> {
    return this.httpClient.get<EmployeeDTO[]>(this.apiURL + "getEmployee");
  }
  public getAllEmployees$(): Observable<EmployeeDTO[]> {
    return this.httpClient.get<EmployeeDTO[]>(this.apiURL + "getAllEmployees");
  }
  public addSalary(SalaryDTO: SalaryDTO): Observable<SalaryDTO> {
    return this.httpClient.post<SalaryDTO>(this.apiURL + 'addSalary', SalaryDTO);
  }
  public addPaylater(payLaterDTO: PayLaterDTO): Observable<SalaryDTO> {
    return this.httpClient.post<PayLaterDTO>(this.apiURL + 'addPaylater', payLaterDTO);
  }
  public getEmployeeSalary$(id: number): Observable<SalaryDTO> {
    return this.httpClient.get<SalaryDTO>(this.apiURL + "getEmployeeSalary"+"/employeeId="+id);
  }
  public getAllSalaries$(): Observable<SalaryDTO[]> {
    return this.httpClient.get<SalaryDTO[]>(this.apiURL + "getAllSalaries");
  }
  public getAllPayLaters$(): Observable<PayLaterDTO[]> {
  return this.httpClient.get<PayLaterDTO[]>(this.apiURL + "getAllPayLaters");
  }

}