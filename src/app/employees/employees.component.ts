import { Component, OnInit } from '@angular/core';
import { AppStore } from 'src/app/AppStore/AppStore';
import { EmployeeDTO } from 'src/app/DTOs/EmployeeDTO';
import { EmployeeService } from '../services/EmployeeService/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit{

  employees : EmployeeDTO[] =[];

  constructor(public store$:AppStore,public employeeService:EmployeeService){}

  async ngOnInit(): Promise<void> {
    this.employeeService.getAllEmployees$().subscribe(x=>{
      this.employees = x;
    })
  }

}
