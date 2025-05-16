// src/users/users.service.ts

import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly adminUser = {
    id: 1,
    username: 'admin',
    password: '$2a$10$AhdhRbtaE32/F2JQ0UTqs.c2KM4o.zSUxzTe0ynvbfHQ8KjMQ9.AG',
  };

  async findOne(username: string) {
    if (username === this.adminUser.username) {
      return this.adminUser;
    }
    return null;
  }
}
