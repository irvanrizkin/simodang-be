import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PondsModule } from './ponds/ponds.module';
import { MetricsModule } from './metrics/metrics.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, PondsModule, MetricsModule, UsersModule],
})
export class AppModule {}
