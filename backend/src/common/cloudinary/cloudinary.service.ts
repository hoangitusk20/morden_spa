import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { cloudinary } from './cloudinary.config';

@Injectable()
export class CloudinaryService {
  async uploadImage(file: Express.Multer.File): Promise<any> {
    console.log('cloudinary config', cloudinary.config());
    try {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'staff_avatars' }, // folder trên cloudinary
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          },
        );

        stream.end(file.buffer);
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to upload image');
    }
  }
}
