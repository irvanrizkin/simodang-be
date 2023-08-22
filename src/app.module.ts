import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PondsModule } from './ponds/ponds.module';
import { MetricsModule } from './metrics/metrics.module';

@Module({
  imports: [AuthModule, PondsModule, MetricsModule],
})
export class AppModule {}
