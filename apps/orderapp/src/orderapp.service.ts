import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderappService {
  getHello(): string {
    return 'Hello World!';
  }
}
