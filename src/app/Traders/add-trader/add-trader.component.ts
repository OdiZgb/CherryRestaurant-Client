import { Component, OnInit } from '@angular/core';
import {  FormBuilder,  FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { TraderDTO } from 'src/app/DTOs/TraderDTO';
import { TradersService } from 'src/app/services/TradersService/traders.service';

@Component({
  selector: 'app-add-trader',
  templateUrl: './add-trader.component.html',
  styleUrls: ['./add-trader.component.scss']
})
export class AddTraderComponent implements OnInit{
  myForm!: FormGroup;

  constructor(private traderService:TradersService,private formBuilder: FormBuilder, private messageService: MessageService){}
  ngOnInit(): void {
    this.createForm();
  }

  public addTrader(traderDTO:TraderDTO):Observable<TraderDTO>{
    return this.traderService.addTrader(traderDTO)
  }
 
  onSubmit(): void {
    if (this.myForm.valid) {
      const traderNameValue = this.myForm.get('traderName')?.value;
      const traderNumberValue = this.myForm.get('traderNumber')?.value;
      const traderEmailValue = this.myForm.get('traderEmail')?.value;
 
      let traderToAdd: TraderDTO = {
        id: 0,
        name: traderNameValue,
        mobileNumber: traderNumberValue,
        email: traderEmailValue
      } as TraderDTO;

      this.traderService.addTrader(traderToAdd).subscribe(
        x=>{
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Trader '+x.name+' has been added'});

        }
      );
    } else {
    }
  }
 createForm(){
  this.myForm = this.formBuilder.group({
    traderName: ['', [Validators.required, Validators.minLength(1)]],
    traderNumber: ['', [Validators.required, Validators.minLength(1)]],
    traderEmail: ['', []]  
  });
 }
}
