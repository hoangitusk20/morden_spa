import { Module } from '@nestjs/common';
import { RevalidateController } from './revalidate.controller';
import { RevalidateService } from './revalidate.service';
import { AuthModule } from 'src/auth/auth.module';
import { ServiceModule } from 'src/service/service.module';

@Module({
  imports: [AuthModule, ServiceModule],
  controllers: [RevalidateController],
  providers: [RevalidateService],
})
export class RevalidateModule {}
