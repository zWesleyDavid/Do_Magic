import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { CreatePersonagemDto } from './dto/create-personagem.dto';
import { UpdatePersonagemDto } from './dto/update-personagem.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Personagem, PersonagemDocument } from './schemas/personagem.schema';
import { Model, Types } from 'mongoose';
import { ClassePersonagem } from 'src/enums/classePersonagens.enum';
import { geradorDeIDs } from 'src/utils/idGerador';
import { v4 as uuidv4 } from 'uuid';
import { ItemMagico } from '../itens/schemas/itens.schema';
import { ItemMagicoService } from '../itens/itens.service';

@Injectable()
export class PersonagemService {

  constructor(
    @InjectModel(Personagem.name)
    private readonly personagemModel: Model<PersonagemDocument>,
    @Inject(forwardRef(() => ItemMagicoService))
    private readonly itemModel: ItemMagicoService,
  ) { }

  async create(createDto: CreatePersonagemDto): Promise<Personagem> {
    try {
      const nomeExistente = await this.personagemModel.findOne({ nome: createDto.nome });
      if (nomeExistente) {
        throw new BadRequestException('Nome já está em uso.');
      }

      const apelidoExistente = await this.personagemModel.findOne({ apelido: createDto.apelido });
      if (apelidoExistente) {
        throw new BadRequestException('Apelido já está em uso.');
      }

      const normalizaClasse = createDto.classe.toUpperCase();
      const { forca, defesa } = createDto;
      const identificador = geradorDeIDs();

      if (forca + defesa > 10) {
        throw new BadRequestException('Você tem apenas 10 pontos de habilidade para distribuir!')
      }

      if (!Object.values(ClassePersonagem).includes(normalizaClasse as ClassePersonagem)) {
        throw new BadRequestException('Classe inexistente!');
      }

      const personagem = new this.personagemModel({
        ...createDto,
        _id: identificador,
        classe: normalizaClasse,
        nivel: 1,
        itensMagicos: [],
      })

      return await personagem.save();
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException('Não foi possível criar personagem');
    }
  }

  async findAll(): Promise<Personagem[]> {
    try {
      const personagens = await this.personagemModel.find().lean();
      const personagensComItens = personagens.map((personagem) => ({
        ...personagem,
        itens: personagem.itens.map((item) => new Types.ObjectId(item)),
      }));
      return personagensComItens;
    } catch (error) {
      throw new InternalServerErrorException('Não foi possível listar personagens');
    }
  }

  async findById(id: string): Promise<Personagem> {
    try {
      const personagem = await this.personagemModel.findById(id).lean();
      if (!personagem) {
        throw new NotFoundException('Personagem não encontrado');
      }
      return {
        ...personagem,
        itens: personagem.itens.map((item) => new Types.ObjectId(item)),
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Não foi possível buscar o personagem por ID');
    }
  }

  async update(id: string, updatePersonagemDto: UpdatePersonagemDto) {
    try {
      const personagem = await this.personagemModel.findByIdAndUpdate(
        id,
        { apelido: updatePersonagemDto.apelido },
        { new: true },
      );

      if (!personagem) {
        throw new NotFoundException('Personagem não foi encontrado');
      }

      return personagem;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro ao atualizar personagem');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const result = await this.personagemModel.findByIdAndDelete(id);

      if (!result) {
        throw new NotFoundException('Personagem não encontrado');
      }

    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro ao deletar personagem');
    }
  }
}
