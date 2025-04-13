import { TipoItem } from "src/enums/classeItens.enum";

export class Item {
    id: string;
    nome: string;
    tipo: TipoItem;
    forca: number;
    defesa: number;
}