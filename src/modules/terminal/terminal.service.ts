import { Injectable, CACHE_MANAGER, Inject, Logger, HttpException } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { IGame } from '@interfaces/game';
import { LogsService } from '@modules/logs/logs.service';
import { SoundService } from '@modules/sound/sound.service';

@Injectable()
export class TerminalService extends Logger {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private logs: LogsService,
    private soundService: SoundService,
  ) {
    super();
  }

  async checkCommand(body) {
    const { ip } = body;
    const game: IGame = await this.cacheManager.get('game');

    if (game) {
      if (game.ip === ip) {
        this.logs.log('ip correct');

        return {
          code: game.code,
        };
      }

      this.logs.log(`ip incorrect got: ${ip} expected: ${game.ip}`);
      this.soundService.play('incorrect.wav');

      return {
        code: 'ip incorrect',
      };
    }

    throw new HttpException('there is currently no game running', 404);
  }
}
