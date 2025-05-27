// src/revalidate/revalidate.service.ts

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { ServiceService } from 'src/service/service.service';

@Injectable()
export class RevalidateService {
  constructor(
    private readonly serviceService: ServiceService, // Inject ServiceService
  ) {}

  async triggerRevalidate(tag: string): Promise<any> {
    try {
      const res = await axios.post(`${process.env.NEXT_REVALIDATE_URL}`, {
        tag: tag,
        secret: process.env.REVALIDATE_SECRET,
      });

      return res.data;
    } catch (error) {
      throw new HttpException(
        'Failed to revalidate',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Hàm revalidate các related service
  async relatedServiceRevalidate(id: string): Promise<any[]> {
    const relatedServices = await this.serviceService.getRelatedServices(
      id,
      100,
    );
    const results = await Promise.all(
      relatedServices.map((service: any) =>
        this.triggerRevalidate(`related-service-${service._id}`),
      ),
    );
    return results;
  }
}
