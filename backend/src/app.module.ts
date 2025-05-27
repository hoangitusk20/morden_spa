import { Module } from '@nestjs/common';
import { ServiceModule } from './service/service.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { BookingModule } from './booking/booking.module';
import { StaffModule } from './staff/staff.module';
import { RevalidateModule } from './revalidate/revalidate.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    MongooseModule.forRoot(process.env.DB_URI || ''),
    ServiceModule,
    AuthModule,
    BookingModule,
    StaffModule,
    RevalidateModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
