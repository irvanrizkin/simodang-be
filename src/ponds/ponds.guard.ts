import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class PondsGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { pool_id: id } = request.body;

    const pond = await this.prisma.pond.findUnique({
      where: { id },
    });

    if (!pond) throw new NotFoundException();

    return true;
  }
}
