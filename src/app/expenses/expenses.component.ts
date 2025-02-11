import { Component, OnInit } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { ExpenseItemDTO } from '../DTOs/ExpenseItemDTO';
import { ExpensesService } from '../services/expensesService/expenses.service';
import { ExpenseCategoryDTO } from '../DTOs/ExpenseCategoryDTO';

@Component({
    selector: 'expense-item',
    templateUrl: 'expenses.component.html',
    styleUrls: ['expenses.component.scss']
})
export class ExpenseComponent implements OnInit {
    expenseCategory: ExpenseItemDTO[] = [];
    loading: boolean = true;

    constructor(private expenseItemService: ExpensesService) {}

    ngOnInit() {
        this.expenseItemService.getAllExpenseCategories$().subscribe((expenseItems) => {
             expenseItems.forEach(element => {
                element.expenseItems.forEach(s => {
                    s.expenseCategory = element;
                this.expenseCategory.push(s);
                    
                });
            });
            this.loading = false;
        });
    }

    clear(table: Table) {
        table.clear();
    }
}
