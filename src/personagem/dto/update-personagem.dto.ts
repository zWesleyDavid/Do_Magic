import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePersonagemDto {
    @IsString()
    @IsNotEmpty()
    apelido: string;
}
