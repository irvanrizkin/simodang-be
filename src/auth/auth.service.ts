import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: email.split('@')[0],
      },
    });
  }
}
