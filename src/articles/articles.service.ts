import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { ArticleDto } from './dto/articles.dto';
import { Article } from '@prisma/client';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async addArticle(articleDto: ArticleDto): Promise<Article> {
    const { title, url } = articleDto;
    return this.prisma.article.create({
      data: {
        title,
        url,
      },
    });
  }
}
