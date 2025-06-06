import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Staff } from 'src/staff/schemas/staff.schema';

export type BookingDocument = Booking & Document;

@Schema({ timestamps: true })
export class Booking {
  @Prop({ required: true })
  customer: string;

  @Prop({
    type: [
      {
        _id: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, default: 1 }, // Default quantity to 1
      },
    ],
    required: true,
  })
  services: {
    _id: string;
    name: string;
    price: number;
    quantity: number; // Ensure quantity is always present
  }[];

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Staff.name,
    default: null,
  })
  staff: MongooseSchema.Types.ObjectId | null;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  time: string;

  @Prop({
    required: true,
    enum: ['pending', 'confirmed', 'completed', 'canceled'],
  })
  status: 'pending' | 'confirmed' | 'completed' | 'canceled';

  @Prop({ required: true })
  amount: number;

  @Prop()
  phone?: string;

  @Prop()
  email?: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
