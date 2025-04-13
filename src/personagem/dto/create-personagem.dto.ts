import { IsEnum, IsInt, IsNotEmpty, IsString, Max, Min } from "class-validator";
import { ClassePersonagem } from "src/enums/classePersonagens.enum";

export class CreatePersonagemDto {
    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsString()
    @IsNotEmpty()
    apelido: string;
    
    @IsEnum(ClassePersonagem)
    classe: ClassePersonagem;
    
    @IsInt()
    @Min(0)
    @Max(10)
    forca: number;
    
    @IsInt()
    @Min(0)
    @Max(10)
    defesa: number;
}
