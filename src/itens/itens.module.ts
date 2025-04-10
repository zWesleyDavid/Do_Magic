import { Module } from '@nestjs/common';
import { ItensService } from './itens.service';
import { ItensController } from './itens.controller';

@Module({
  controllers: [ItensController],
  providers: [ItensService],
})
export class ItensModule {}
