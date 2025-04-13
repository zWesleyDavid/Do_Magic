import { IsEnum, IsInt, IsNotEmpty, IsString, Max, Min } from "class-validator";
import { TipoItem } from "src/enums/classeItens.enum";

export class CreateItenDto {
    @IsString()
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

    @IsString()
    @IsNotEmpty()
    descricao: string;

    @IsString()
    personagemId: string;
}
