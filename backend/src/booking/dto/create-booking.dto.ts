import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsOptional,
  IsEnum,
  IsNumber,
  IsMongoId,
} from 'class-validator';
import { Type } from 'class-transformer';

class ServiceItemDto {
  @IsString()
  @IsNotEmpty()
  _id: string; // giữ string để dễ dùng, có thể là ObjectId dưới dạng string

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  price: number;
}

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  customer: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ServiceItemDto)
  services: ServiceItemDto[];

  @IsOptional()
  @IsMongoId()
  staff?: string | null;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  time: string;

  @IsEnum(['pending', 'confirmed', 'completed', 'canceled'])
  status: 'pending' | 'confirmed' | 'completed' | 'canceled';

  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  email?: string;
}
