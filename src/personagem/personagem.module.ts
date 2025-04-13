import { Module, forwardRef } from '@nestjs/common';
import { PersonagemService } from './personagem.service';
import { PersonagemController } from './personagem.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Personagem, PersonagemSchema } from './schemas/personagem.schema';
import { ItensModule } from '../itens/itens.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Personagem.name, schema: PersonagemSchema },
    ]),
    forwardRef(() => ItensModule),
  ],
  controllers: [PersonagemController],
  providers: [PersonagemService],
  exports: [PersonagemService],
})
export class PersonagemModule { }
