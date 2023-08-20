import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PondsModule } from './ponds/ponds.module';

@Module({
  imports: [AuthModule, PondsModule],
})
export class AppModule {}
