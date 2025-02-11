import { CategoryDTO } from "./CategoryDTO";

export interface CategoryPropertyDTO {
  id: number | null;
  categoryId: number | null;
  name: string | null;
  categoryDTO: CategoryDTO | null;
}