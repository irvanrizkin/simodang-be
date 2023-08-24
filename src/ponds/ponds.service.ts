import { Injectable } from '@nestjs/common';
import { Pond, Prisma } from '@prisma/client';
import { PrismaService } from 'src/services/prisma.service';
import { PondsDto } from './dto/ponds.dto';

@Injectable()
export class PondsService {
  constructor(private prisma: PrismaService) {}

  async addPond(pondsDto: PondsDto, userId: number): Promise<Pond> {
    const { name, deviceId, seedDate, address, city } = pondsDto;
    return this.prisma.pond.create({
      data: {
        name,
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

  async getPondById(id: number): Promise<Pond> {
    return this.prisma.pond.findUnique({
      where: { id },
    });
  }

  async updatePond(id: number, data: Prisma.PondUpdateInput): Promise<Pond> {
    return this.prisma.pond.update({
      data,
      where: { id },
    });
  }
}
