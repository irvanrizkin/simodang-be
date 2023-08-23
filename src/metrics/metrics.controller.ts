import {
  Body,
  Controller,
  Post,
  UsePipes,
  UseGuards,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { Metric as MetricModel } from '@prisma/client';
import { MetricsService } from './metrics.service';
import { MetricsTransformPipe } from './metrics.transform.pipe';
import { MetricsDto } from './dto/metrics.dto';
import { PondsGuard } from 'src/ponds/ponds.guard';
import { DateParamsDto } from './dto/date.params.dto';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Post()
  @UsePipes(MetricsTransformPipe)
  @UseGuards(PondsGuard)
  async addMetric(@Body() metricsDto: MetricsDto): Promise<MetricModel> {
    return this.metricsService.addMetric(metricsDto);
  }

  @Get(':id')
  @UseGuards(PondsGuard)
  async getMetricsRangeDate(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dateParamsDto: DateParamsDto,
  ) {
    return this.metricsService.getMetricsRangeDate(id, dateParamsDto);
  }
}
