import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Category } from 'src/service/schemas/service.schema';

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsNumber()
  readonly duration: number;

  @IsNumber()
  readonly price: number;

  @IsString()
  readonly image: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly detailDescription: string;

  @IsEnum(Category)
  readonly category: Category;
}
