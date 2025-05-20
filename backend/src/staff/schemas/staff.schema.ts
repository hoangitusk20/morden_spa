import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StaffDocument = Staff & Document;

@Schema({ timestamps: true })
export class Staff {
  @Prop({ required: true })
  name: string;

  @Prop()
  phone?: string;

  @Prop()
  email?: string;

  @Prop({ type: [String], default: [] })
  skills: string[];

  @Prop()
  avatarUrl?: string;
}

export const StaffSchema = SchemaFactory.createForClass(Staff);
