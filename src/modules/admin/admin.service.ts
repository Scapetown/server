import { Injectable, CACHE_MANAGER, Inject, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import Game from '@interfaces/game';
import { v4 as uuidv4 } from 'uuid';
import generateIp from '@utils/ip';
import config from '@config/config';
import { ArdruinoService } from '@modules/ardruino/ardruino.service';

@Injectable()
export class AdminService extends Logger {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache, private ardruinoService: ArdruinoService) {
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
    this.ardruinoService.showOnLcd(`[Het IP adres is]${game.ip}`); //[ represents the first line, ] represents the secund line

    super.log('game created');

    return {
      message: 'game created',
    };
  }
}
