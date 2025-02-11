import { EmployeeDTO } from "./EmployeeDTO";
import { ExpenseCategoryDTO } from "./ExpenseCategoryDTO";

export interface ExpenseItemDTO {
    id: number;
    name: string | null;
    cost: number;
    expenseCategoryId: number;
    employeeId: number;
    expenseCategory: ExpenseCategoryDTO | null;
    employee: EmployeeDTO | null;
    dateTime: Date;
}