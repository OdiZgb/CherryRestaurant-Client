import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { EmployeeDTO } from 'src/app/DTOs/EmployeeDTO';
import { SalaryDTO } from 'src/app/DTOs/SalaryDTO';
import { MainSeviceService } from 'src/app/main-sevice.service';
import { EmployeeService } from 'src/app/services/EmployeeService/employee.service';

@Component({
  selector: 'app-add-salaries',
  templateUrl: './add-salaries.component.html',
  styleUrls: ['./add-salaries.component.scss']
})
export class AddSalariesComponent {
  myForm!: FormGroup;
  EmployeeController = new FormControl('');
  constEmployeeNames: Map<number, string> = new Map<number, string>();
  employeeDTOs: EmployeeDTO[] = [];
  isFoundEmployee: boolean = false;
  foundEmployeeId: number = -1;
  employeeNames: Map<number, string> = new Map<number, string>();
  foundEmployee!: EmployeeDTO;


  constructor(private mainsService: MainSeviceService, private formBuilder: FormBuilder, private employeeService: EmployeeService, private messageService: MessageService) { }
  ngOnInit(): void {
    this.createForm();
    this.mainsService.employeeService.getAllEmployees$().subscribe(x => {
      this.employeeDTOs = x;
      x.forEach(employee => {
        if (employee.id !== null && employee.user.name !== null) {
          this.employeeNames.set(employee.id, employee.user.name);
          this.constEmployeeNames.set(employee.id, employee.user.name);
        }
      });
    });

    this.myForm = this.formBuilder.group({
      employeeName: this.EmployeeController,
      employeeSalary: ['', [Validators.required, Validators.minLength(1)]],
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

  public addSalary(salaryDTO: SalaryDTO): Observable<SalaryDTO> {
    return this.employeeService.addSalary(salaryDTO)
  }


  createForm() {
    this.myForm = this.formBuilder.group({
      employeeName: ['', [Validators.required, Validators.minLength(1)]],
      employeeSalary: ['', [Validators.required, Validators.minLength(1)]],
    });
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
  onOptionSelectedEmployee(event: any): void {
    const selectedValue = event.option.value;
    const selectedKey = this.getKeyFromValueEmployee(selectedValue);

    this.isFoundEmployee = true;
    this.foundEmployeeId = selectedKey || -1;
    // Assign the selected key to a variable or perform any other logic
    this.employeeDTOs.forEach(employee => {
      if (employee.id == this.foundEmployeeId) {
        this.foundEmployee = employee;
      }
    });
  }
  onSubmit(): void {
    if (this.myForm?.valid) {
      const employeeValue = this.myForm.get('employeeName')?.value;
      const salary = this.myForm.get('employeeSalary')?.value;

      let salaryDTO: SalaryDTO = {
        employeeId: this.foundEmployeeId,
        value: Number.parseInt(salary),
        employee : this.foundEmployee
      }  as SalaryDTO;


      this.employeeService.addSalary(salaryDTO).subscribe(
        x => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Salary Added'});

        },
        error => {
        }
      );

    } else {
    }
  }
}
