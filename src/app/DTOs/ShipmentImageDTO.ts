export interface ShipmentImageDTO {
    id: number | null;
    imageURL: string;
    barcode: string | null,
    alterText: string | null;
    file?: File;
}