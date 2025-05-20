import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service, ServiceDocument } from './schemas/service.schema';
import { plainToInstance } from 'class-transformer';
import { CreateServiceDto } from './dto/create-service.dto';
import { ServiceResponseDto } from './dto/service-response.dto';
import { CloudinaryService } from 'src/common/cloudinary/cloudinary.service';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServiceService {
  constructor(
    @InjectModel(Service.name)
    private serviceModel: Model<ServiceDocument>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async create(
    createServiceDto: CreateServiceDto,
    file: Express.Multer.File,
  ): Promise<ServiceResponseDto> {
    let imageUrl = '';
    if (file) {
      const uploadResult = await this.cloudinaryService.uploadImage(file);
      imageUrl = uploadResult.secure_url;
    } else {
      throw new InternalServerErrorException('Image file is required');
    }

    const createdService = new this.serviceModel({
      ...createServiceDto,
      image: imageUrl,
    });

    const saved = await createdService.save();
    return plainToInstance(ServiceResponseDto, saved.toObject());
  }

  async findAll(): Promise<ServiceResponseDto[]> {
    const services = await this.serviceModel.find().lean();
    return plainToInstance(ServiceResponseDto, services);
  }

  async findOne(id: string): Promise<ServiceResponseDto> {
    const service = await this.serviceModel.findById(id).lean();
    if (!service) {
      throw new NotFoundException(`Service with id ${id} not found`);
    }
    return plainToInstance(ServiceResponseDto, service);
  }
  async update(
    id: string,
    updateServiceDto: UpdateServiceDto,
    file?: Express.Multer.File,
  ): Promise<ServiceResponseDto> {
    let imageUrl: string | undefined = undefined;

    if (file) {
      const uploadResult = await this.cloudinaryService.uploadImage(file);
      imageUrl = uploadResult.secure_url;
    }

    const updatePayload = {
      ...updateServiceDto,
      ...(imageUrl && { image: imageUrl }),
    };

    const updated = await this.serviceModel
      .findByIdAndUpdate(id, updatePayload, { new: true, runValidators: true })
      .lean();

    if (!updated) {
      throw new NotFoundException(`Service with id ${id} not found`);
    }

    return plainToInstance(ServiceResponseDto, updated);
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.serviceModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException(`Service with id ${id} not found`);
    }
  }
}
