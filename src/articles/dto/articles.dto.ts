import { Expose } from 'class-transformer';

export class ArticleDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  url: string;
}
