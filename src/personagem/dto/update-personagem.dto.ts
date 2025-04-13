import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonagemDto } from './create-personagem.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePersonagemDto extends PartialType(CreatePersonagemDto) {
    @IsString()
    @IsNotEmpty()
    apelido: string;
}
