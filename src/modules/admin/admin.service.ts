import { Injectable, CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import Game from '@interfaces/game';
import { v4 as uuidv4 } from 'uuid';
import generateIp from '@utils/ip';
import config from '@config/config';
import { Logger } from '@nestjs/common';

@Injectable()
export class AdminService extends Logger {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    super();
  }

  newGame() {
    this.cacheManager.del('game');

    const game: Game = {
      id: uuidv4(),
      ip: generateIp(),
      code: Math.floor(1000 + Math.random() * 9000),
      time_remaining: config.game.duration,
      running: true,
    };

    this.cacheManager.set('game', game);

    super.log('game created');

    return {
      message: 'game created',
    };
  }
}
