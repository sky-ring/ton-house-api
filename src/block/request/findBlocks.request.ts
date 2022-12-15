import { Type } from 'class-transformer';
import { IsDate, IsInt, IsOptional } from 'class-validator';

export class FindBlocksRequest {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  from: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  to: Date;
}
