import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemMagicoService } from './itens.service';
import { ItemMagicoController } from './itens.controller';
import { ItemMagico, ItemMagicoSchema } from './schemas/itens.schema';
import { Personagem, PersonagemSchema } from '../personagem/schemas/personagem.schema';
import { PersonagemModule } from '../personagem/personagem.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ItemMagico.name, schema: ItemMagicoSchema },
      { name: Personagem.name, schema: PersonagemSchema },
    ]),
    forwardRef(() => PersonagemModule),
  ],
  controllers: [ItemMagicoController],
  providers: [ItemMagicoService],
  exports: [ItemMagicoService],
})
export class ItensModule { }
