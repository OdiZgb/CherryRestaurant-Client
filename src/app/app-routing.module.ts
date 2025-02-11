import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsComponent } from './items/items.component';
import { ItemsListComponent } from './items/items-list/items-list.component';
import { AddItemComponent } from './items/add-item/add-item.component';
import { AddCategoryComponent } from './categories/add-category/add-category.component';
import { HomeComponent } from './home/home.component';
import { AddMarkaComponent } from './markas/add-marka/add-marka.component';
import { CategoriesComponent } from './categories/categories.component';
import { MarkasComponent } from './markas/markas.component';
import { AddPriceInComponent } from './prices/add-price-in/add-price-in.component';
import { AddPriceOutComponent } from './prices/add-price-out/add-price-out.component';
import { InventoryComponent } from './inventory/inventory/inventory.component';
import { ShipmentInhistoryComponent } from './inventory/inventory/shipment-inhistory/shipment-inhistory.component';
import { AddShipmentComponent } from './inventory/inventory/add-shipment/add-shipment.component';
import { DisplayCurrentQuantitesComponent } from './inventory/inventory/display-current-quantites/display-current-quantites.component';
import { TradersComponent } from './Traders/traders/traders.component';
import { AddTraderComponent } from './Traders/add-trader/add-trader.component';
import { EmployeesComponent } from './employees/employees.component';
import { AddEmployeeComponent } from './employees/add-employee/add-employee.component';
import { AddSalariesComponent } from './employees/add-salaries/add-salaries.component';
import { DisplaySalariesComponent } from './employees/display-salaries/display-salaries.component';
import { AddExpensesComponent } from './expenses/add-expenses/add-expenses.component';
import { ExpenseComponent } from './expenses/expenses.component';
import { AddExpenseItemComponent } from './expenses/add-expense-item/add-expense-item.component';
import { AddBillComponent } from './billing/add-bill/add-bill.component';
import { DebtsComponent } from './billing/debts/debts.component';
import { ItemViewComponent } from './items/item-view/item-view.component';
import { DisplayShipmentParentComponent } from './inventory/inventory/display-shipment-parent/display-shipment-parent.component';
import { InventoryTemplateComponent } from './inventory/inventory/inventory-template/inventory-template.component';
import { ShipmentItemDetailsComponent } from './inventory/inventory/shipment-item-details/shipment-item-details.component';
import { LoginComponent } from './login/login.component';
import { ExpiringItemsComponent } from './items/expiring-items/expiring-items.component';
import { AddClientComponent } from './Clients/add-client/add-client.component';
import { ViewClientsComponent } from './Clients/view-clients/view-clients.component';
import { CashBillHistoryComponent } from './billing/cash-bill-history/cash-bill-history.component';
import { CashBillHistoryNoDeletionComponent } from './billing/cash-bill-history-no-deletion/cash-bill-history-no-deletion.component';
import { PricesComponent } from './prices/prices.component';
import { TagComponent } from './items/Tags/tag-management/tag.component';

const routes: Routes = [
  {path:'',component:AddBillComponent},
  {path:'items',component:ItemsComponent},
  {path: 'items/view/:itemId', component: ItemViewComponent},
  {path:'items/list',component:ItemsListComponent},
  {path:'items/add',component:AddItemComponent},
  {path:'items/expiring',component:ExpiringItemsComponent},
  {path:'items/tags', component: TagComponent },
  {path:'category/add',component:AddCategoryComponent},
  {path:'category/display',component:CategoriesComponent},
  {path:'marka/display',component:MarkasComponent},
  {path:'markas/add',component:AddMarkaComponent},
  {path:'prices/add',component:PricesComponent},
  {path:'pricein/add',component:AddPriceInComponent},
  {path:'priceout/add',component:AddPriceOutComponent},
  {path:'inventory/add',component:AddShipmentComponent},
  {path:'inventory/display',component:DisplayCurrentQuantitesComponent},
  {path:'inventory/parent/display',component:DisplayShipmentParentComponent},
  {path:'inventory/parent/displayUnit/:barcode',component:InventoryTemplateComponent},
  {path:'inventory/item/details/:itemBarcode/:invBarcode',component:ShipmentItemDetailsComponent},
  {path:'inventory/history',component:ShipmentInhistoryComponent},
  {path:'inventory/traders',component:TradersComponent},
  {path:'inventory/traders/add',component:AddTraderComponent},
  {path:'employees',component:EmployeesComponent},
  {path:'employees/add',component:AddEmployeeComponent},
  {path:'employees/salaries/add',component:AddSalariesComponent},
  {path:'employees/salaries/display',component:DisplaySalariesComponent},
  {path:'expenses/add',component:AddExpensesComponent},
  {path:'expenses/display',component:ExpenseComponent},
  {path:'expenses/item/add',component:AddExpenseItemComponent},
  {path:'bill/add',component:AddBillComponent},
  {path:'bill/debt/display',component:DebtsComponent},
  {path:'bill/history/display',component:CashBillHistoryComponent },
  {path:'bill/history/display-deleted',component:CashBillHistoryNoDeletionComponent },
  {path:'clients/add',component:AddClientComponent},
  {path:'clients/view',component:ViewClientsComponent},
  {path:'auh/login',component:LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
