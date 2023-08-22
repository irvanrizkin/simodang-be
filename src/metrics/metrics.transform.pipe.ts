import { PipeTransform } from '@nestjs/common';
import { MetricsDto } from './dto/metrics.dto';

export class MetricsTransformPipe implements PipeTransform {
  transform(body: any) {
    const result = new MetricsDto();
    result.pondId = body.pool_id;
    result.temperature = body.temper_val;
    result.ph = body.ph_val;
    result.tdo = body.oxygen_val;
    result.tds = body.tds_val;
    result.turbidity = body.turbidities_val;
    return result;
  }
}
