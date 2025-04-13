import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersonagemService } from './personagem.service';
import { CreatePersonagemDto } from './dto/create-personagem.dto';
import { UpdatePersonagemDto } from './dto/update-personagem.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Personagem } from './schemas/personagem.schema';

@ApiTags('Personagens')
@Controller('personagem')
export class PersonagemController {
  constructor(private readonly personagemService: PersonagemService) {}

  @Post()
  @ApiOperation({summary: 'Cadastrar personagem'})
  @ApiResponse({status: 201, description: 'Personagem criado com sucesso'})
  create(@Body() createPersonagemDto: CreatePersonagemDto): Promise<Personagem> {
    return this.personagemService.create(createPersonagemDto);
  }

  @Get()
  @ApiOperation({summary: 'Listar todos os personagens'})
  async findAll(): Promise<Personagem[]> {
    return this.personagemService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'Buscar personagem por ID'})
  @ApiParam({name: 'id', type: String})
  async findById(@Param('id') id: string): Promise<Personagem> {
    return this.personagemService.findById(id);
  }

  @Patch(':id/apelido')
  @ApiOperation({summary: 'Atualizar apelido por ID'})
  @ApiParam({name: 'id', type: String})
  async update(@Param('id') id: string, @Body() updatePersonagemDto: UpdatePersonagemDto): Promise<Personagem> {
    return this.personagemService.update(id, updatePersonagemDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Remover personagem por ID'})
  @ApiParam({name: 'id', type: String})
  async delete(@Param('id') id: string): Promise<void> {
    return this.personagemService.delete(id);
  }
}
