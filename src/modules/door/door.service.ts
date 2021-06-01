import {
  Injectable,
  CACHE_MANAGER,
  Inject,
  Logger,
  HttpException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import Game from '@interfaces/game';

@Injectable()
export class DoorService extends Logger {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    super();
  }

  async checkCode(body) {
    const { code } = body;
    const game: Game = await this.cacheManager.get('game');

    if (game) {
      if (game.code == code) {
        return {
          message: 'ok',
        };
      }

      return {
        message: 'code incorrect',
      };
    }

    throw new HttpException('there is currently no game running', 404);
  }
}
