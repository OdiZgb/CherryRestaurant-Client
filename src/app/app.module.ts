import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemsComponent } from './items/items.component';
import { ItemsListComponent } from './items/items-list/items-list.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { ItemCardComponent } from './Templates/item-card/item-card.component';
import { AddItemComponent } from './items/add-item/add-item.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidePanelComponent } from './side-panel/side-panel.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatAutocompleteModule} from '@angular/material/autocomplete'; 
import { CategoriesComponent } from './categories/categories.component';
import { AddCategoryComponent } from './categories/add-category/add-category.component';
import {MatSelectModule} from '@angular/material/select';
import { MiddlePanelComponent } from './home/middle-panel/middle-panel.component';
import { HomeComponent } from './home/home.component';
import { MarkasComponent } from './markas/markas.component';
import { AddMarkaComponent } from './markas/add-marka/add-marka.component';
import { PricesComponent } from './prices/prices.component';
import {MatButtonModule} from '@angular/material/button'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { DialogAnimationsExampleDialog } from './Templates/dialog-animations-example-dialog/dialog-animations-example-dialog.component'; 
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CommonModule } from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ItemListFilterComponent } from './items/items-list/item-list-filter/item-list-filter.component'; 
import { CheckboxModule } from 'primeng/checkbox';
import { CategoryCardComponent } from './Templates/category-card/category-card.component';
import { MarkaCardComponent } from './Templates/marka-card/marka-card.component';
import { DeleteCategoryDialogComponent } from './Templates/delete-category-dialog/delete-category-dialog.component';
import { AddPriceInComponent } from './prices/add-price-in/add-price-in.component';
import { AddPriceOutComponent } from './prices/add-price-out/add-price-out.component';
import { InventoryComponent } from './inventory/inventory/inventory.component';
import { TableModule } from 'primeng/table';
import { ShipmentInhistoryComponent } from './inventory/inventory/shipment-inhistory/shipment-inhistory.component';
import { AddShipmentComponent } from './inventory/inventory/add-shipment/add-shipment.component';
import { DisplayCurrentQuantitesComponent } from './inventory/inventory/display-current-quantites/display-current-quantites.component';
import { TradersComponent } from './Traders/traders/traders.component';
import { AddTraderComponent } from './Traders/add-trader/add-trader.component';
import { ComponentStore } from '@ngrx/component-store';
import { AppStore } from './AppStore/AppStore';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { EmployeesComponent } from './employees/employees.component';
import { AddEmployeeComponent } from './employees/add-employee/add-employee.component';
import { AddSalariesComponent } from './employees/add-salaries/add-salaries.component';
import { DisplaySalariesComponent } from './employees/display-salaries/display-salaries.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AddExpenseItemComponent } from './expenses/add-expense-item/add-expense-item.component';
import { ExpenseComponent } from './expenses/expenses.component';
import { AddExpensesComponent } from './expenses/add-expenses/add-expenses.component';
import { BillingComponent } from './billing/billing/billing.component';
import { AddBillComponent } from './billing/add-bill/add-bill.component';
import { ScrollerModule } from 'primeng/scroller';
import { DebtsComponent } from './billing/debts/debts.component';
import { ButtonModule } from 'primeng/button';
import { BarcodeGeneratorAllModule, DataMatrixGeneratorAllModule, QRCodeGeneratorAllModule } from '@syncfusion/ej2-angular-barcode-generator';
import { SpeedDialModule } from 'primeng/speeddial';
import { SplitterModule } from 'primeng/splitter';
import { DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddShipmentDialogComponent } from './inventory/inventory/add-shipment-dialog/add-shipment-dialog.component';
import { ItemViewComponent } from './items/item-view/item-view.component';
import { EditItemComponent } from './items/edit-item/edit-item.component';
import { ProductEditDialogComponent } from './items/edit-item/product-edit-dialog/product-edit-dialog.component';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DisplayShipmentParentComponent } from './inventory/inventory/display-shipment-parent/display-shipment-parent.component';
import { InventoryTemplateComponent } from './inventory/inventory/inventory-template/inventory-template.component';
import { ShipmentItemDetailsComponent } from './inventory/inventory/shipment-item-details/shipment-item-details.component';
import { LoginComponent } from './login/login.component';
import { SplitButtonModule } from 'primeng/splitbutton';
import { WjBarcodeCommonModule } from '@mescius/wijmo.angular2.barcode.common';
import { PrintBadcodesComponent } from './inventory/inventory/shipment-inhistory/print-badcodes/print-badcodes.component';
import { PrintBarcodesPageComponent } from './inventory/inventory/shipment-inhistory/print-badcodes-page/print-barcodes-pagecomponent';
import { BarcodeGeneratorComponent } from './helpers/barcode-generator.component';
import { ExpiringItemsComponent } from './items/expiring-items/expiring-items.component';
import { AddClientComponent } from './Clients/add-client/add-client.component';
import { ViewClientsComponent } from './Clients/view-clients/view-clients.component';
import { CashBillHistoryComponent } from './billing/cash-bill-history/cash-bill-history.component';
import { AccordionModule } from 'primeng/accordion';
import { ToolbarModule } from 'primeng/toolbar';
import { CashBillHistoryNoDeletionComponent } from './billing/cash-bill-history-no-deletion/cash-bill-history-no-deletion.component';
import { DeleteMarkaDialogComponent } from './Templates/delete-marka-dialog/delete-marka-dialog.component';
import { EditInventoryDialogComponent } from './helpers/edit-inventory-dialog/edit-inventory-dialog.component';
import { EditInventoryComponent } from './inventory/inventory/edit-inventory/edit-inventory.component';
import { TagComponent } from './items/Tags/tag-management/tag.component';
import { AgGridModule } from 'ag-grid-angular';
import {MatPaginatorModule} from '@angular/material/paginator'; 
import {MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    ItemsListComponent,
    ItemCardComponent,
    AddItemComponent,
    SidePanelComponent,
    CategoriesComponent,
    AddCategoryComponent,
    MiddlePanelComponent,
    HomeComponent,
    MarkasComponent,
    AddMarkaComponent,
    PricesComponent,
    ItemListFilterComponent,
    CategoryCardComponent,
    MarkaCardComponent,
    AddPriceInComponent,
    AddPriceOutComponent,
    InventoryComponent,
    ShipmentInhistoryComponent,
    AddShipmentComponent,
    DisplayCurrentQuantitesComponent,
    TradersComponent,
    AddTraderComponent,
    EmployeesComponent,
    AddEmployeeComponent,
    AddSalariesComponent,
    DisplaySalariesComponent,
    AddExpensesComponent,
    ExpenseComponent,
    AddExpenseItemComponent,
    BillingComponent,
    AddBillComponent,
    DebtsComponent,
    AddShipmentDialogComponent,
    ItemViewComponent,
    EditItemComponent,
    ProductEditDialogComponent,
    DisplayShipmentParentComponent,
    InventoryTemplateComponent,
    ShipmentItemDetailsComponent,
    LoginComponent,
    PrintBadcodesComponent,
    PrintBarcodesPageComponent,
    BarcodeGeneratorComponent,
    ExpiringItemsComponent,
    AddClientComponent,
    ViewClientsComponent,
    CashBillHistoryComponent,
    CashBillHistoryNoDeletionComponent,
    EditInventoryDialogComponent,
    EditInventoryComponent,
    TagComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSidenavModule,
    MatExpansionModule,
    MatListModule,
    MatTabsModule,
    MatSelectModule,
    MatAutocompleteModule,
    CommonModule,
    FormsModule,
    ToolbarModule,
    TableModule,
    MatCheckboxModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    CheckboxModule,
    AutoCompleteModule,
    ToastModule,
    ScrollerModule,
    ScrollerModule,
    ButtonModule,
    SpeedDialModule,
    BarcodeGeneratorAllModule,
    QRCodeGeneratorAllModule,
    DataMatrixGeneratorAllModule,
    SplitterModule,
    DynamicDialogModule,
    PanelMenuModule,
    SplitButtonModule,
    WjBarcodeCommonModule,
    AccordionModule,
    AgGridModule,
    MatPaginatorModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule
   ],
  providers: [
    DynamicDialogRef ,
    DialogAnimationsExampleDialog ,DeleteCategoryDialogComponent,DeleteMarkaDialogComponent,  {
      provide: MatDialogRef,
      useValue: {}
    },
    AppStore,
    MessageService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
