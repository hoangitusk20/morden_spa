import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking, BookingDocument } from './schemas/booking.schema';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name)
    private readonly bookingModel: Model<BookingDocument>,
  ) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const createdBooking = new this.bookingModel(createBookingDto);
    return await createdBooking.save();
  }

  async findAll(filters?: {
    search?: string;
    status?: string;
    fromDate?: string;
    toDate?: string;
  }): Promise<Booking[]> {
    const query: any = {};

    // Search by customer name or ID (partial match)
    if (filters?.search) {
      const isObjectId = /^[0-9a-fA-F]{24}$/.test(filters.search);

      if (isObjectId) {
        query.$or = [
          { customer: { $regex: filters.search, $options: 'i' } },
          { _id: filters.search },
        ];
      } else {
        query.customer = { $regex: filters.search, $options: 'i' };
      }
    }

    // Filter by status
    if (filters?.status && filters.status !== 'All') {
      query.status = filters.status;
    }

    // Filter by date range
    if (filters?.fromDate || filters?.toDate) {
      query.date = {};
      if (filters.fromDate) {
        query.date.$gte = filters.fromDate;
      }
      if (filters.toDate) {
        query.date.$lte = filters.toDate;
      }
    }

    return this.bookingModel.find(query).exec();
  }

  async findOne(id: string): Promise<Booking> {
    const booking = await this.bookingModel.findById(id).exec();
    if (!booking) {
      throw new NotFoundException(`Booking with ID "${id}" not found`);
    }
    return booking;
  }

  async update(
    id: string,
    updateBookingDto: UpdateBookingDto,
  ): Promise<Booking> {
    const updatedBooking = await this.bookingModel
      .findByIdAndUpdate(id, updateBookingDto, {
        new: true,
        runValidators: true,
      })
      .exec();

    if (!updatedBooking) {
      throw new NotFoundException(`Booking with ID "${id}" not found`);
    }

    return updatedBooking;
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.bookingModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Booking with ID "${id}" not found`);
    }
  }
}
