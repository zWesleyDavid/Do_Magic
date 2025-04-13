import { IsEnum, IsInt, IsNotEmpty, Max, Min } from "class-validator";
import { TipoItem } from "src/enums/classeItens.enum";

export class CreateItenDto {
    @IsNotEmpty()
    nome: string;

    @IsEnum(TipoItem)
    tipo: TipoItem;
    
    @IsInt()
    @Min(0)
    @Max(10)
    forca: number;
    
    @IsInt()
    @Min(0)
    @Max(10)
    defesa: number;
}
