import { Injectable } from "@angular/core";
import { TraderDTO } from "../DTOs/TraderDTO";
import { ComponentStore } from "@ngrx/component-store";
import { EmployeeDTO } from "../DTOs/EmployeeDTO";
import { SalaryDTO } from "../DTOs/SalaryDTO";
import { ItemDTO } from "../DTOs/ItemDTO";
import { InventoryDTO } from "../DTOs/InventoryDTO";

export interface AppState{
  traders:TraderDTO[]
  employees:EmployeeDTO[];
  salaries:SalaryDTO[];
  AddedShipmentToInventory:InventoryDTO[];
  itemToEdit:ItemDTO | null
  employee:EmployeeDTO | null

}

@Injectable()
export class AppStore extends ComponentStore<AppState> {
  
  constructor() {
    super({traders: [], employees: [], salaries: [], AddedShipmentToInventory:[],itemToEdit:null,employee:null});
  }
}