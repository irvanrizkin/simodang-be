import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/services/prisma.service';
import * as bcrypt from 'bcrypt';

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

  async updateUser(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    if (data.password) {
      const hashedPassword = await bcrypt.hash(data.password.toString(), 10);
      data.password = hashedPassword;
    }

    return this.prisma.user.update({
      data,
      where: { id },
    });
  }
}
