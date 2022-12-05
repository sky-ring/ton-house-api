import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class FindValidatorsRequest {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit: number;
}
