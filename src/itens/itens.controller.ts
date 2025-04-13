import { Body, Controller, Delete, Get, Param, Post, NotFoundException } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateItenDto } from './dto/create-iten.dto';
import { ItemMagicoService } from './itens.service';
import { PersonagemService } from '../personagem/personagem.service';
import { ItemMagico } from './schemas/itens.schema';

@ApiTags('Itens Mágicos')
@Controller('itens-magicos')
export class ItemMagicoController {
  constructor(
    private readonly service: ItemMagicoService,
    private readonly personagemService: PersonagemService,
  ) { }

  @Post()
  @ApiOperation({ summary: 'Criar um novo item mágico' })
  @ApiResponse({ status: 201, description: 'Item mágico criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos ou regras de negócio violadas.' })
  create(@Body() dto: CreateItenDto): Promise<ItemMagico> {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os itens mágicos' })
  @ApiResponse({ status: 200, description: 'Lista de itens mágicos retornada com sucesso.' })
  findAll(): Promise<ItemMagico[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar item mágico por ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID do item mágico' })
  @ApiResponse({ status: 200, description: 'Item mágico encontrado.' })
  @ApiResponse({ status: 404, description: 'Item mágico não encontrado.' })
  findById(@Param('id') id: string): Promise<ItemMagico> {
    return this.service.findById(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar item mágico por ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID do item mágico' })
  @ApiResponse({ status: 200, description: 'Item mágico deletado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Item mágico não encontrado.' })
  delete(@Param('id') id: string): Promise<void> {
    return this.service.delete(id);
  }

  @Get('personagem/:personagemId')
  @ApiOperation({ summary: 'Listar itens mágicos de um personagem' })
  @ApiParam({ name: 'personagemId', type: String, description: 'ID do personagem' })
  @ApiResponse({ status: 200, description: 'Itens mágicos do personagem retornados com sucesso.' })
  findByPersonagem(@Param('personagemId') personagemId: string): Promise<ItemMagico[]> {
    return this.service.findByPersonagemId(personagemId);
  }

  @Get('personagem/:personagemId/amuleto')
  @ApiOperation({ summary: 'Buscar amuleto de um personagem' })
  @ApiParam({ name: 'personagemId', type: String, description: 'ID do personagem' })
  @ApiResponse({ status: 200, description: 'Amuleto do personagem retornado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Amuleto ou personagem não encontrado.' })
  async findAmuleto(@Param('personagemId') personagemId: string): Promise<ItemMagico> {
    await this.personagemService.findById(personagemId);
    return this.service.findAmuleto(personagemId);
  }
}