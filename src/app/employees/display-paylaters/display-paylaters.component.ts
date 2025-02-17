import { Component } from '@angular/core';
import { AppStore } from 'src/app/AppStore/AppStore';
import { PayLaterDTO } from 'src/app/DTOs/PayLaterDTO';
import { MainSeviceService } from 'src/app/main-sevice.service';

@Component({
  selector: 'app-display-paylaters',
  templateUrl: './display-paylaters.component.html',
  styleUrls: ['./display-paylaters.component.scss']
})
export class DisplayPaylatersComponent {
  payLates : PayLaterDTO[] =[];
  constructor(public store$:AppStore,public mainSeviceService:MainSeviceService){}
  ngOnInit(): void {
    this.mainSeviceService.employeeService.getAllPayLaters$().subscribe(paylater=>{
      this.payLates = paylater;
      this.payLates.forEach(s => {
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
