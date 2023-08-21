import { Injectable } from '@nestjs/common';
import { Pond } from '@prisma/client';
import { PrismaService } from 'src/services/prisma.service';
import { PondsDto } from './dto/ponds.dto';

@Injectable()
export class PondsService {
  constructor(private prisma: PrismaService) {}

  async addPond(pondsDto: PondsDto, userId: number): Promise<Pond> {
    const { deviceId, seedDate, address, city } = pondsDto;
    return this.prisma.pond.create({
      data: {
        deviceId,
        seedDate,
        address,
        city,
        userId,
      },
    });
  }

  async getPondsByUser(userId: number): Promise<Pond[]> {
    return this.prisma.pond.findMany({
      where: { userId },
    });
  }
}
