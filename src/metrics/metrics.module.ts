import { Module } from '@nestjs/common';
import { MetricsController } from './metrics.controller';
import { MetricsService } from './metrics.service';
import { PrismaService } from 'src/services/prisma.service';
import { PondsService } from 'src/ponds/ponds.service';

@Module({
  controllers: [MetricsController],
  providers: [MetricsService, PrismaService, PondsService],
})
export class MetricsModule {}
