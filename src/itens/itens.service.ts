import { BadRequestException, Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Personagem, PersonagemDocument } from '../personagem/schemas/personagem.schema';
import { geradorDeIDs } from 'src/utils/idGerador';
import { ItemMagico, ItemMagicoDocument } from './schemas/itens.schema';
import { CreateItenDto } from './dto/create-iten.dto';
import { TipoItem } from 'src/enums/classeItens.enum';
import { PersonagemService } from '../personagem/personagem.service';

@Injectable()
export class ItemMagicoService {
  constructor(
    @InjectModel(ItemMagico.name) private itemModel: Model<ItemMagicoDocument>,
    @Inject(forwardRef(() => PersonagemService))
    private personagemService: PersonagemService,
  ) { }

  async create(dto: CreateItenDto): Promise<ItemMagico> {
    const personagem = await this.personagemService.findById(dto.personagemId);
    if (!personagem) {
      throw new NotFoundException('Personagem não encontrado.');
    }

    if (dto.forca + dto.defesa === 0) {
      throw new BadRequestException('Item precisa ter ao menos 1 ponto de força ou defesa.');
    }

    if (dto.tipo === TipoItem.ARMA && dto.defesa !== 0) {
      throw new BadRequestException('Item do tipo ARMA deve ter defesa igual a 0.');
    }

    if (dto.tipo === TipoItem.ARMADURA && dto.forca !== 0) {
      throw new BadRequestException('Item do tipo ARMADURA deve ter força igual a 0.');
    }

    if (dto.tipo === TipoItem.AMULETO) {
      const amuleto = await this.itemModel.findOne({ personagemId: dto.personagemId, tipo: TipoItem.AMULETO });
      if (amuleto) {
        throw new BadRequestException('Personagem já possui um Amuleto.');
      }
    }

    const item = new this.itemModel({
      ...dto,
      id: geradorDeIDs(),
      descricao: dto.descricao,
    });

    return await item.save();
  }

  async findAll(): Promise<ItemMagico[]> {
    return this.itemModel.find();
  }

  async findById(id: string): Promise<ItemMagico> {
    const item = await this.itemModel.findOne({ id });
    if (!item) throw new NotFoundException('Item não encontrado.');
    return item;
  }

  async delete(id: string): Promise<void> {
    const item = await this.itemModel.findOneAndDelete({ id });
    if (!item) throw new NotFoundException('Item não encontrado.');
  }

  async findByPersonagemId(personagemId: string): Promise<ItemMagico[]> {
    return this.itemModel.find({ personagemId });
  }

  async findAmuleto(personagemId: string): Promise<ItemMagico> {
    const item = await this.itemModel.findOne({ personagemId, tipo: TipoItem.AMULETO });
    if (!item) throw new NotFoundException('Amuleto não encontrado para esse personagem.');
    return item;
  }
}