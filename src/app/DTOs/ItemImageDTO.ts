export interface ItemImageDTO {
    id: number | null;
    itemId: number;
    imageURL: string;
    alterText: string | null;
    file?: File;
}