import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonagemModule } from './personagem/personagem.module';
import { ItensModule } from './itens/itens.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/domagic'),
    PersonagemModule, 
    ItensModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
