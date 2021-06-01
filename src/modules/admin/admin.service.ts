import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  newGame() {
    return {
      message: 'game created',
    };
  }
}
