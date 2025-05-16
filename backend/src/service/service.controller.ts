import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto/create-service.dto';
import { ServiceResponseDto } from './dto/service-response.dto/service-response.dto';
import { cp } from 'fs';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  async create(
    @Body() createServiceDto: CreateServiceDto,
  ): Promise<ServiceResponseDto> {
    console.log('createServiceDto', createServiceDto);
    return this.serviceService.create(createServiceDto);
  }

  @Get()
  async findAll(): Promise<ServiceResponseDto[]> {
    return this.serviceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ServiceResponseDto> {
    return this.serviceService.findOne(id);
  }
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateServiceDto: CreateServiceDto,
  ): Promise<ServiceResponseDto> {
    console.log('updateServiceDto', updateServiceDto);
    return this.serviceService.update(id, updateServiceDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string): Promise<void> {
    return this.serviceService.remove(id);
  }
}
