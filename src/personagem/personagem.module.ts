import { Module } from '@nestjs/common';
import { PersonagemService } from './personagem.service';
import { PersonagemController } from './personagem.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Personagem, PersonagemSchema } from './schemas/personagem.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Personagem.name, schema: PersonagemSchema},
    ])
  ],
  controllers: [PersonagemController],
  providers: [PersonagemService],
  exports: [PersonagemService],
})
export class PersonagemModule {}
