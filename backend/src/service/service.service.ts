import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Service, ServiceDocument } from './schemas/service.schema';
import { plainToInstance } from 'class-transformer';
import { CreateServiceDto } from './dto/create-service.dto';
import { ServiceResponseDto } from './dto/service-response.dto';

@Injectable()
export class ServiceService {
  constructor(
    @InjectModel(Service.name) private serviceModel: Model<ServiceDocument>,
  ) {}

  async create(
    createServiceDto: CreateServiceDto,
  ): Promise<ServiceResponseDto> {
    const createdService = new this.serviceModel(createServiceDto);
    const saved = await createdService.save();
    // chuyển document thành DTO (chỉ expose các trường có @Expose)
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
    updateServiceDto: CreateServiceDto,
  ): Promise<ServiceResponseDto> {
    const updatedService = await this.serviceModel
      .findByIdAndUpdate(id, updateServiceDto, { new: true })
      .lean();
    if (!updatedService) {
      throw new NotFoundException(`Service with id ${id} not found`);
    }
    return plainToInstance(ServiceResponseDto, updatedService);
  }

  async remove(id: string): Promise<void> {
    const deletedService = await this.serviceModel.findByIdAndDelete(id);
    if (!deletedService) {
      throw new NotFoundException(`Service with id ${id} not found`);
    }
  }
}
