import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent implements OnInit {

  panelOpenState = false;
  constructor(private router: Router) { }
  items: MenuItem[] = [];
  ngOnInit(): void {

    this.items = [
      {
          label: 'Products',
          icon: 'pi pi-fw pi-file',
          items: [
              {
                  label: 'Delete',
                  icon: 'pi pi-fw pi-trash'
              },
              {
                  label: 'Export',
                  icon: 'pi pi-fw pi-external-link'
              }
          ]
      },
      {
          label: 'Edit',
          icon: 'pi pi-fw pi-pencil',
          items: [
              {
                  label: 'Left',
                  icon: 'pi pi-fw pi-align-left'
              },
              {
                  label: 'Right',
                  icon: 'pi pi-fw pi-align-right'
              },
              {
                  label: 'Center',
                  icon: 'pi pi-fw pi-align-center'
              },
              {
                  label: 'Justify',
                  icon: 'pi pi-fw pi-align-justify'
              }
          ]
      },
      {
          label: 'Users',
          icon: 'pi pi-fw pi-user',
          items: [
              {
                  label: 'New',
                  icon: 'pi pi-fw pi-user-plus'
              },
              {
                  label: 'Delete',
                  icon: 'pi pi-fw pi-user-minus'
              },
              {
                  label: 'Search',
                  icon: 'pi pi-fw pi-users',
                  items: [
                      {
                          label: 'Filter',
                          icon: 'pi pi-fw pi-filter',
                          items: [
                              {
                                  label: 'Print',
                                  icon: 'pi pi-fw pi-print'
                              }
                          ]
                      },
                      {
                          icon: 'pi pi-fw pi-bars',
                          label: 'List'
                      }
                  ]
              }
          ]
      },
      {
          label: 'Events',
          icon: 'pi pi-fw pi-calendar',
          items: [
              {
                  label: 'Edit',
                  icon: 'pi pi-fw pi-pencil',
                  items: [
                      {
                          label: 'Save',
                          icon: 'pi pi-fw pi-calendar-plus'
                      },
                      {
                          label: 'Delete',
                          icon: 'pi pi-fw pi-calendar-minus'
                      }
                  ]
              },
              {
                  label: 'Archieve',
                  icon: 'pi pi-fw pi-calendar-times',
                  items: [
                      {
                          label: 'Remove',
                          icon: 'pi pi-fw pi-calendar-minus'
                      }
                  ]
              }
          ]
      }
  ];
  }
  navigateToItemsRoute(): void {
    this.router.navigate(['/items/list']);
  }
  navigateToItemViewRoute(): void {
    this.router.navigate(['/items/view']);
  }
  navigateToAddItemRoute(): void {
    this.router.navigate(['items/add']);
  }
  navigateToTagsRoute(): void {
    this.router.navigate(['items/tags']);
  }
  
  navigateToAddMarkaRoute(): void {
    this.router.navigate(['markas/add']);
  }

  navigateToDisplayProducsRoute(): void {
    this.router.navigate(['items/list']);
  }
  navigateToeEpiringitemsRoute(): void {
    this.router.navigate(['items/expiring']);
  }
  navigateToAddCategoryRoute(): void {
    this.router.navigate(['category/add']);
  }
  navigateToDisplayCategoriesRoute(): void {
    this.router.navigate(['category/display']);
  }
  navigateToDisplayMarkasRoute(): void {
    this.router.navigate(['marka/display']);
  }
  navigateToAddPriceRoute(): void {
    this.router.navigate(['prices/add']);
  }
  navigateToAddPriceInRoute(): void {
    this.router.navigate(['pricein/add']);
  }
  navigateToAddPriceOutRoute(): void {
    this.router.navigate(['priceout/add']);
  }

  navigateToAddInventoryRoute(): void {
    this.router.navigate(['inventory/add']);
  }
  navigateToDisplayInventoryRoute(): void {
    this.router.navigate(['inventory/display']);
  }
  navigateToDisplayInventoryHistoryRoute(): void {
    this.router.navigate(['inventory/history']);
  }
  navigateToDisplayInventoryParentHistoryRoute(): void {
    this.router.navigate(['inventory/parent/display']);
  }
  navigateToDisplayInventoryUnitRoute(): void {
    this.router.navigate(['inventory/parent/displayUnit']);
  }
  navigateToDisplayTradersRoute(): void {
    this.router.navigate(['inventory/traders']);
  }
  navigateToAddTraderRoute(): void {
    this.router.navigate(['inventory/traders/add']);
  }
  navigateToDisplayEmployeesRoute(): void {
    this.router.navigate(['employees']);
  }
  navigateToAddEmployeeRoute(): void {
    this.router.navigate(['employees/add']);
  }
  navigateToAddSalaryRoute(): void {
    this.router.navigate(['employees/salaries/add']);
  }
  navigateToDispalySalaryRoute(): void {
    this.router.navigate(['employees/salaries/display']);
  }
  navigateToAddExpensesRoute(): void {
    this.router.navigate(['expenses/add']);
  }
  navigateToDisplayExpensesRoute(): void {
    this.router.navigate(['expenses/display']);
  }

  navigateToAddExpenseItemRoute(): void {
    this.router.navigate(['expenses/item/add']);
  }
  navigateToAddBillItemRoute(): void {
    this.router.navigate(['bill/add']);
  }
  navigateToCashBillHistoryRoute(): void {
    this.router.navigate(['bill/history/display']);
  }
  navigateToCashDeletedBillHistoryRoute(): void {
    this.router.navigate(['bill/history/display-deleted']);
  }

  
  navigateToDisplayClientDebtsRoute(): void {
    this.router.navigate(['bill/debt/display']);
  }
  
  navigateToAddClientRoute() {
    this.router.navigate(['clients/add']);
    }
    navigateToViewClientRoute() {
      this.router.navigate(['clients/view']);
      }
  
}

