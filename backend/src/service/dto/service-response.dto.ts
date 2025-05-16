import { Expose } from 'class-transformer';
import { Category } from 'src/service/schemas/service.schema';

export class ServiceResponseDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  duration: number;

  @Expose()
  price: number;

  @Expose()
  image: string;

  @Expose()
  description: string;

  @Expose()
  detailDescription: string;

  @Expose()
  category: Category;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  constructor(partial: Partial<ServiceResponseDto>) {
    Object.assign(this, partial);
  }
}
