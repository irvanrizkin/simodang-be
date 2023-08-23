import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Get,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { Pond as PondModel } from '@prisma/client';
import { PondsDto } from './dto/ponds.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { PondsService } from './ponds.service';
import { PondsUpdateDto } from './dto/ponds.update.dto';

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

  @Get()
  @UseGuards(AuthGuard)
  async getPondsByUser(@Request() req): Promise<PondModel[]> {
    const { id } = req.user;
    return this.pondsService.getPondsByUser(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async updatePond(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() pondsUpdateDto: PondsUpdateDto,
  ): Promise<PondModel> {
    return this.pondsService.updatePond(id, pondsUpdateDto);
  }
}
