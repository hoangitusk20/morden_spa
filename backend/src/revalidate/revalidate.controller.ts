// src/revalidate/revalidate.controller.ts

import { Controller, Post, Body, Param } from '@nestjs/common';
import { RevalidateService } from './revalidate.service';

@Controller('revalidate')
export class RevalidateController {
  constructor(private readonly revalidateService: RevalidateService) {}

  @Post()
  async revalidateTag(@Body() body: { tag: string }) {
    return await this.revalidateService.triggerRevalidate(body.tag);
  }

  // Controller revalidate các related service
  @Post('related/:id')
  async revalidateRelated(@Param('id') id: string) {
    return await this.revalidateService.relatedServiceRevalidate(id);
  }
}
