import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { EmployeeDTO } from 'src/app/DTOs/EmployeeDTO';
import { ExpenseCategoryDTO } from 'src/app/DTOs/ExpenseCategoryDTO';
import { ExpenseItemDTO } from 'src/app/DTOs/ExpenseItemDTO';
import { MainSeviceService } from 'src/app/main-sevice.service';
import { EmployeeService } from 'src/app/services/EmployeeService/employee.service';
import { InventoryService } from 'src/app/services/InventoryService/inventory.service';
import { ItemListService } from 'src/app/services/ItemsService/item-list.service';
import { ExpensesService } from 'src/app/services/expensesService/expenses.service';

@Component({
  selector: 'app-add-expense-item',
  templateUrl: './add-expense-item.component.html',
  styleUrls: ['./add-expense-item.component.scss']
})
export class AddExpenseItemComponent {
  foundExpenseCategory!: ExpenseCategoryDTO;
  foundEmployee!: EmployeeDTO;

  myForm!: FormGroup;
  ExpenseCategoryController = new FormControl(''); 
  EmployeeController = new FormControl(''); 
  itemNames: Map<number, string> = new Map<number, string>();
  expenseCategoryNames: Map<number, string> = new Map<number, string>();
  employeeNames: Map<number, string> = new Map<number, string>();
  constItemNames: Map<number, string> = new Map<number, string>();
  constEmployeeNames: Map<number, string> = new Map<number, string>();
  constExpenseCategoryNames: Map<number, string> = new Map<number, string>();
   expenseCategoryDTOs:ExpenseCategoryDTO[]=[];
  employeeDTOs:EmployeeDTO[]=[];
  filteredOptions!: Observable<string[]>;
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  foundItemId: number= -1;
  isFoundExpenseCategory: boolean = false;
  isFoundEmployee: boolean = false;
  foundExpenseCategoryId: number= -1;
  foundEmployeeId: number= -1;

  constructor(private employeeService: EmployeeService,private formBuilder: FormBuilder,public expensesService:ExpensesService, private messageService: MessageService) {}
   a:string[]=[];
   public addExpenseCategorItemyDTO(expenseCategoryDTO:ExpenseCategoryDTO):Observable<ExpenseCategoryDTO>{
    return this.expensesService.addExpenseCategory(expenseCategoryDTO)
  }
  ngOnInit(): void {
    this.expensesService.getAllExpenseCategories$().subscribe(x => {
      this.expenseCategoryDTOs = x;
      x.forEach(expenseCategory => {
        if(expenseCategory.id !== null && expenseCategory.name !== null) {
          this.expenseCategoryNames.set(expenseCategory.id, expenseCategory.name);
          this.constExpenseCategoryNames.set(expenseCategory.id, expenseCategory.name);
        }
      });
    });
    this.employeeService.getAllEmployees$().subscribe(x => {
      this.employeeDTOs = x;
      x.forEach(employee => {
        if(employee.id !== null && employee.user.name !== null) {
          this.employeeNames.set(employee.id, employee.user.name);
          this.constEmployeeNames.set(employee.id, employee.user.name);
        }
      });
    });
 
    this.myForm = this.formBuilder.group({
      expenseCategoryName: this.ExpenseCategoryController,
      employeeName: this.EmployeeController,
      cost: ['', [Validators.required, Validators.minLength(1)]],
      date: ['', [Validators.required, Validators.minLength(1)]],
    });
    
    this.ExpenseCategoryController.valueChanges.subscribe(x => {
      let foundExpenseCategoryByName = this.expenseCategoryDTOs.find(s => s.name == x);
    
      if (foundExpenseCategoryByName != null && foundExpenseCategoryByName.id != null) {
        this.isFoundExpenseCategory = true;
        this.foundExpenseCategoryId = foundExpenseCategoryByName.id;
      } else if (x == null || x == '') {
        this.expenseCategoryNames = new Map(this.constExpenseCategoryNames);
        return;
      }
    
      this.fiterDataExpenseCategory(x);
    });
    this.EmployeeController.valueChanges.subscribe(x => {
      let foundEmployeeByName = this.employeeDTOs.find(s => s.user.name == x);
    
      if (foundEmployeeByName != null && foundEmployeeByName.id != null) {
        this.isFoundEmployee = true;
        this.foundEmployeeId = foundEmployeeByName.id;
      } else if (x == null || x == '') {
        this.employeeNames = new Map(this.constEmployeeNames);
        return;
      }
    
      this.fiterDataEmployee(x);
    });
  }
  fiterDataBarcode(x: string | null): void {
    if(x==null){
      return;
    }
  let Names: Map<number, string> = new Map<number, string>();

    this.itemNames?.forEach((val,k) => {
      if(val?.toLocaleLowerCase().includes(x?.toLocaleLowerCase())){
        Names.set(k,val);
      }
    });
    this.itemNames=Names;
  }
 

  onSubmit(): void {
    if (this.myForm.valid) {
      const cost = this.myForm.get('cost')?.value;
      const date = this.myForm.get('date')?.value;

      let expenseItemDTO: ExpenseItemDTO = {
        id: 0,
        name: null,
        cost: cost,
        expenseCategoryId: this.foundExpenseCategoryId,
        employeeId: this.foundEmployeeId,
        dateTime: date
      }  as ExpenseItemDTO;
 
      this.expensesService.addExpenseItem(expenseItemDTO).subscribe(
        x=>{
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Expenses item item has been added ' + x});

        }
      );

    } else {
    }
  }
 
  onOptionSelectedExpenseCategory(event: any): void {
    const selectedValue = event.option.value;
    const selectedKey = this.getKeyFromValueExpenseCategory(selectedValue);
  
    this.isFoundExpenseCategory = true;
    this.foundExpenseCategoryId = selectedKey || -1;
    // Assign the selected key to a variable or perform any other logic
    this.expenseCategoryDTOs.forEach(expenseCategory => {
      if(expenseCategory.id==this.foundExpenseCategoryId){
        this.foundExpenseCategory = expenseCategory;
      }
  });
 
  }
  onOptionSelectedEmployee(event: any): void {
    const selectedValue = event.option.value;
    const selectedKey = this.getKeyFromValueEmployee(selectedValue);
  
    this.isFoundEmployee = true;
    this.foundEmployeeId = selectedKey || -1;
    // Assign the selected key to a variable or perform any other logic
    this.employeeDTOs.forEach(employee => {
      if(employee.id==this.foundExpenseCategoryId){
        this.foundEmployee = employee;
      }
  });
 
  }
  getKeyFromValueBarcode(value: string): number | undefined {
    const entry = Array.from(this.itemNames.entries()).find(([key, val]) => val === value);
    return entry ? entry[0] : undefined;
  }
  getKeyFromValueExpenseCategory(value: string): number | undefined {
    const entry = Array.from(this.expenseCategoryNames.entries()).find(([key, val]) => val === value);
    return entry ? entry[0] : undefined;
  }
  getKeyFromValueEmployee(value: string): number | undefined {
    const entry = Array.from(this.employeeNames.entries()).find(([key, val]) => val === value);
    return entry ? entry[0] : undefined;
  }
  fiterDataEmployee(x: string | null): void {
    if (x == null || x == '') {
        this.employeeNames = new Map(this.constEmployeeNames);
        return;
    }
    let Names: Map<number, string> = new Map<number, string>();

    this.employeeNames?.forEach((val, k) => {
        if (val?.toLocaleLowerCase().includes(x?.toLocaleLowerCase())) {
            Names.set(k, val);
        }
    });
    this.employeeNames = Names;
}
fiterDataExpenseCategory(x: string | null): void {
  if (x == null || x == '') {
      this.expenseCategoryNames = new Map(this.constExpenseCategoryNames);
      return;
  }
  let Names: Map<number, string> = new Map<number, string>();

  this.expenseCategoryNames?.forEach((val, k) => {
      if (val?.toLocaleLowerCase().includes(x?.toLocaleLowerCase())) {
          Names.set(k, val);
      }
  });
  this.expenseCategoryNames = Names;
}
}

/*{
  ="id": 0,
  ="itemId": 32,
  ="patchId": 1,
  ="cost": 10,
  ="priceInId": 18,
  "arrivalDate": "2023-06-25T12:23:04.009Z",
  "manufacturingDate": "2023-06-25T12:23:04.009Z",
  "expirationDate": "2023-06-25T12:23:04.009Z"
}
*/
