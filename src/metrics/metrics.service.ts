import { Injectable } from '@nestjs/common';
import { Metric } from '@prisma/client';
import { MetricsDto } from './dto/metrics.dto';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class MetricsService {
  constructor(private prisma: PrismaService) {}

  async addMetric(metricsDto: MetricsDto): Promise<Metric> {
    const { temperature, ph, tdo, tds, turbidity, pondId } = metricsDto;
    return this.prisma.metric.create({
      data: {
        temperature,
        ph,
        tdo,
        tds,
        turbidity,
        pondId,
      },
    });
  }
}
