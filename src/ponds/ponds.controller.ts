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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Pond as PondModel } from '@prisma/client';
import { PondsDto } from './dto/ponds.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { PondsService } from './ponds.service';
import { PondsUpdateDto } from './dto/ponds.update.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

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

  @Patch('image/:id')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'uploads/assets/pond',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const extension = extname(file.originalname);
          callback(null, `${uniqueSuffix}${extension}`);
        },
      }),
    }),
  )
  async changeImage(
    @Request() req,
    @Param('id', new ParseIntPipe()) id,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<PondModel> {
    const imageUrl = `${req.protocol}://${req.get('Host')}/assets/pond/${
      file.filename
    }`;
    return this.pondsService.changeImage(id, imageUrl);
  }
}
