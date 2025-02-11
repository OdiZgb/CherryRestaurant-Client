import { ItemDTO } from "./ItemDTO";

export interface PriceOutDTO {
  id: number;
  itemId: number;
  price: number;
  item: ItemDTO;
  date: string;
  expirationDate: string;
}