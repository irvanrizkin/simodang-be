import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticleDto } from './dto/articles.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Article as ArticleModel } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @UseGuards(AuthGuard, RoleGuard('admin'))
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'uploads/assets/article',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const extension = extname(file.originalname);
          callback(null, `${uniqueSuffix}${extension}`);
        },
      }),
    }),
  )
  async addArticle(
    @Request() req,
    @Body() articlesDto: ArticleDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    articlesDto.url = `${req.protocol}://${req.get('Host')}/assets/article/${
      file.filename
    }`;
    return this.articlesService.addArticle(articlesDto);
  }

  @Get()
  async getArticles(): Promise<ArticleModel[]> {
    return this.articlesService.getArticles();
  }
}
