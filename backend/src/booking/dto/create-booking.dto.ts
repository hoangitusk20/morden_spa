import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Matches,
} from 'class-validator';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{10,11}$/, {
    message: 'Phone number must be 10 or 11 digits',
  })
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  date: string; // ISO format: '2025-05-15'

  @IsString()
  @IsNotEmpty()
  time: string; // e.g. '08:15 AM'

  @IsOptional()
  @IsString()
  specialRequests?: string;
}
