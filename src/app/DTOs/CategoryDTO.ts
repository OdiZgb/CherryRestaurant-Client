import { CategoryPropertyDTO } from "./CategoryPropertyDTO";

export interface CategoryDTO {
  id: number;
  name: string;
  description: string | null;
  ImageURL:string | null;
  categoryPropertiesDTO: CategoryPropertyDTO[] | null;
}