import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Query,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Booking } from './schemas/booking.schema';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  async create(@Body() createBookingDto: CreateBookingDto) {
    return await this.bookingService.create(createBookingDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Query() query): Promise<Booking[]> {
    return this.bookingService.findAll({
      search: query.search,
      status: query.status,
      fromDate: query.fromDate,
      toDate: query.toDate,
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return await this.bookingService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateBookingDto: UpdateBookingDto,
  ) {
    return await this.bookingService.update(id, updateBookingDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string): Promise<void> {
    await this.bookingService.remove(id);
  }
}
