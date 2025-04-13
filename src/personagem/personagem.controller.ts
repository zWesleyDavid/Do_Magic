import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersonagemService } from './personagem.service';
import { CreatePersonagemDto } from './dto/create-personagem.dto';
import { UpdatePersonagemDto } from './dto/update-personagem.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Personagem } from './schemas/personagem.schema';

@ApiTags('Personagens')
@Controller('personagem')
export class PersonagemController {
  constructor(private readonly personagemService: PersonagemService) { }

  @Post()
  @ApiOperation({ summary: 'Cadastrar personagem' })
  @ApiResponse({ status: 201, description: 'Personagem criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos ou regras de negócio violadas.' })
  create(@Body() createPersonagemDto: CreatePersonagemDto): Promise<Personagem> {
    return this.personagemService.create(createPersonagemDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os personagens' })
  @ApiResponse({ status: 200, description: 'Lista de personagens retornada com sucesso.' })
  findAll(): Promise<Personagem[]> {
    return this.personagemService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar personagem por ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID do personagem' })
  @ApiResponse({ status: 200, description: 'Personagem encontrado.' })
  @ApiResponse({ status: 404, description: 'Personagem não encontrado.' })
  findById(@Param('id') id: string): Promise<Personagem> {
    return this.personagemService.findById(id);
  }

  @Patch(':id/apelido')
  @ApiOperation({ summary: 'Atualizar apelido do personagem por ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID do personagem' })
  @ApiResponse({ status: 200, description: 'Apelido atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Personagem não encontrado.' })
  update(@Param('id') id: string, @Body() updatePersonagemDto: UpdatePersonagemDto): Promise<Personagem> {
    return this.personagemService.update(id, updatePersonagemDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover personagem por ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID do personagem' })
  @ApiResponse({ status: 200, description: 'Personagem removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Personagem não encontrado.' })
  delete(@Param('id') id: string): Promise<void> {
    return this.personagemService.delete(id);
  }
}
