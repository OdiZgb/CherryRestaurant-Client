import { Component, OnInit } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { AppStore } from 'src/app/AppStore/AppStore';
import { EmployeeDTO } from 'src/app/DTOs/EmployeeDTO';
import { SalaryDTO } from 'src/app/DTOs/SalaryDTO';
import { MainSeviceService } from 'src/app/main-sevice.service';

@Component({
  selector: 'app-display-salaries',
  templateUrl: './display-salaries.component.html',
  styleUrls: ['./display-salaries.component.scss']
})
export class DisplaySalariesComponent implements OnInit {
  salaries : SalaryDTO[] =[];
  constructor(public store$:AppStore,public mainSeviceService:MainSeviceService){}
  ngOnInit(): void {
    this.mainSeviceService.employeeService.getAllSalaries$().subscribe(salary=>{
      this.salaries = salary;
      this.salaries.forEach(s => {
        this.mainSeviceService.employees.subscribe(e=>{
          e.forEach(element => {
            if(element.id == s.employeeId){
              s.employee = element
            }
          });
        })
      });
    })
  }

}
