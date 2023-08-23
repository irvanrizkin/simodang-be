import { Injectable } from '@nestjs/common';
import { Metric } from '@prisma/client';
import { MetricsDto } from './dto/metrics.dto';
import { PrismaService } from 'src/services/prisma.service';
import { DateParamsDto } from './dto/date.params.dto';

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

  async getMetricsRangeDate(pondId: number, dateParamsDto: DateParamsDto) {
    const { startDate, endDate } = dateParamsDto;
    return this.prisma.$queryRaw`
    SELECT
      DATE(createdAt) AS createdAt,
      AVG(temperature) AS temperature,
      AVG(ph) AS ph,
      AVG(tdo) AS tdo,
      AVG(tds) AS tds,
      AVG(turbidity) AS turbidity
    FROM
      Metric
    WHERE
      pondId = ${pondId} AND
      createdAt BETWEEN ${startDate} AND ${endDate + ' 23:59:59'}
    GROUP BY
      DATE(createdAt)
    ORDER BY
      DATE(createdAt) DESC;
    `;
  }

  async getLastMetric(pondId: number) {
    return this.prisma.metric.findFirst({
      where: { pondId },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
