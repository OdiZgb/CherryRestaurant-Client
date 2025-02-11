import { ExpenseItemDTO } from "./ExpenseItemDTO";

export interface ExpenseCategoryDTO {
  id: number;
  name: string;
  description: string;
  expenseItems: ExpenseItemDTO[];
}