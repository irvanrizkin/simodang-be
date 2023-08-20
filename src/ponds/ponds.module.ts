import { Module } from '@nestjs/common';
import { PondsController } from './ponds.controller';
import { PondsService } from './ponds.service';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  controllers: [PondsController],
  providers: [PondsService, PrismaService],
})
export class PondsModule {}
