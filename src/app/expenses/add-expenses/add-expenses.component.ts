import { Component } from '@angular/core';
import {    FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { EmployeeDTO } from 'src/app/DTOs/EmployeeDTO';
import { ExpenseCategoryDTO } from 'src/app/DTOs/ExpenseCategoryDTO';
import { EmployeeService } from 'src/app/services/EmployeeService/employee.service';
import { ExpensesService } from 'src/app/services/expensesService/expenses.service';

@Component({
  selector: 'app-add-expenses',
  templateUrl: './add-expenses.component.html',
  styleUrls: ['./add-expenses.component.scss']
})
export class AddExpensesComponent {
  myForm!: FormGroup;
  constructor(private expensesService:ExpensesService,private formBuilder: FormBuilder, private messageService: MessageService){}
  ngOnInit(): void {
    this.createForm();
  }

  public addExpenseCategoryDTO(expenseCategoryDTO:ExpenseCategoryDTO):Observable<ExpenseCategoryDTO>{
    return this.expensesService.addExpenseCategory(expenseCategoryDTO)
  }
 
  onSubmit(): void {
    if (this.myForm.valid) {
      const expenseNameValue = this.myForm.get('expenseNameValue')?.value;

 
      let expenseCategoryDTOToAdd: ExpenseCategoryDTO = {
        name: expenseNameValue

      } as ExpenseCategoryDTO;

      this.expensesService.addExpenseCategory(expenseCategoryDTOToAdd).subscribe(
        x=>{
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Expense  '+x.name+' has been added'});

        },e=>{
          this.messageService.add({ severity: 'error', summary: 'error', detail: 'Expense  '+e.message});

        }
      );
    } else {
    }
  }
 createForm(){
  this.myForm = this.formBuilder.group({
    expenseNameValue: ['', [Validators.required, Validators.minLength(1)]],
  });
 }
}
