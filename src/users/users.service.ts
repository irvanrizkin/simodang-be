import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async logout(id: number): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: { token: '' },
    });
  }

  async getProfile(id: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
}
