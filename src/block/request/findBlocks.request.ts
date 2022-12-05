import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class FindBlocksRequest {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit: number;
}
