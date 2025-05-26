// src/users/users.service.ts

import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly adminUser = {
    id: 1,
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD,
  };

  async findOne(username: string) {
    if (username === this.adminUser.username) {
      return this.adminUser;
    }
    return null;
  }
}
