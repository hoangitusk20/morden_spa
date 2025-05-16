import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum Category {
  HAIR = 'Hair',
  NAILS = 'Nails',
  MASSAGE = 'Massage',
  FACIAL = 'Facial',
  BODY = 'Body',
}
export type ServiceDocument = Service & Document;

@Schema({ timestamps: true })
export class Service {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  duration: number;

  @Prop({ required: true })
  price: number;

  image: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  detailDescription: string;

  @Prop({ required: true })
  category: Category;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
