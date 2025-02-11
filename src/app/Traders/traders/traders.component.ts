import { Component, OnInit } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { AppStore } from 'src/app/AppStore/AppStore';
import { TraderDTO } from 'src/app/DTOs/TraderDTO';
import { MainSeviceService } from 'src/app/main-sevice.service';

@Component({
  selector: 'app-traders',
  templateUrl: './traders.component.html',
  styleUrls: ['./traders.component.scss']
})
export class TradersComponent implements OnInit{

  traders : TraderDTO[] =[];

  constructor(public store$:AppStore,public mainSeviceService:MainSeviceService){}

  async ngOnInit(): Promise<void> {
    this.mainSeviceService.traders.subscribe(x=>{
      this.traders = x;
    })
  }

}
