import { Type } from 'class-transformer';
import { IsDefined, IsEnum, IsInt, IsOptional } from 'class-validator';
import { TimeWindow } from '../enum/timeWindow.enum';

export class FindValidatorsChartRequest {
  @IsDefined()
  @IsInt()
  @Type(() => Number)
  limit: number;

  @IsOptional()
  @Type(() => String)
  @IsEnum(TimeWindow)
  timeWindow: TimeWindow = TimeWindow.DAY;
}
