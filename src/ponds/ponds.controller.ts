import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { Pond as PondModel } from '@prisma/client';
import { PondsDto } from './dto/ponds.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { PondsService } from './ponds.service';

@Controller('ponds')
export class PondsController {
  constructor(private readonly pondsService: PondsService) {}

  @Post()
  @UseGuards(AuthGuard)
  async addPond(
    @Request() req,
    @Body() pondsDto: PondsDto,
  ): Promise<PondModel> {
    const { id } = req.user;
    return this.pondsService.addPond(pondsDto, id);
  }
}
