import { Body, Controller, Post, UsePipes, UseGuards } from '@nestjs/common';
import { Metric as MetricModel } from '@prisma/client';
import { MetricsService } from './metrics.service';
import { MetricsTransformPipe } from './metrics.transform.pipe';
import { MetricsDto } from './dto/metrics.dto';
import { PondsGuard } from 'src/ponds/ponds.guard';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Post()
  @UsePipes(MetricsTransformPipe)
  @UseGuards(PondsGuard)
  async addMetric(@Body() metricsDto: MetricsDto): Promise<MetricModel> {
    return this.metricsService.addMetric(metricsDto);
  }
}
