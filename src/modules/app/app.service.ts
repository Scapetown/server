import { Injectable } from '@nestjs/common';
import config from '@config/config';
@Injectable()
export class AppService {
  getInfo() {
    return {
      author: config.author,
    };
  }
}
