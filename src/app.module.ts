import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PondsModule } from './ponds/ponds.module';
import { MetricsModule } from './metrics/metrics.module';
import { UsersModule } from './users/users.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    AuthModule,
    PondsModule,
    MetricsModule,
    UsersModule,
  ],
})
export class AppModule {}
