import { IsOptional, IsString } from 'class-validator';

export class CreateStaffDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString() // CHỈNH Ở ĐÂY: giờ là chuỗi JSON
  skills?: string;
}
