import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceDto } from './create-service.dto';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {
  // Không cần khai báo image ở đây vì ảnh được upload riêng qua file
}
