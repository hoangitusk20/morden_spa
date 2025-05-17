import { Module } from '@nestjs/common';
import { ServiceModule } from './service/service.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { BookingModule } from './booking/booking.module';

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
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
