import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PondsService } from './ponds.service';

@Injectable()
export class PondsGuard implements CanActivate {
  constructor(private pondsService: PondsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (request.method === 'POST') {
      const { pool_id: id } = request.body;
      const pond = await this.pondsService.getPondById(id);
      if (!pond) throw new NotFoundException();
      return true;
    }

    const { id } = request.params;
    const pond = await this.pondsService.getPondById(+id);
    if (!pond) throw new NotFoundException();
    return true;
  }
}
