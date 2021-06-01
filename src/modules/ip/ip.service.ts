import {
  Injectable,
  Logger,
  Inject,
  CACHE_MANAGER,
  HttpException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import Game from '@interfaces/game';

@Injectable()
export class IpService extends Logger {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    super();
  }

  async getIp() {
    const game: Game = await this.cacheManager.get('game');

    if (game) {
      return {
        ip: game.ip,
      };
    }

    throw new HttpException('there is currently no game running', 404);
  }
}
