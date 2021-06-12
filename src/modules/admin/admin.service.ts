import { Injectable, CACHE_MANAGER, Inject, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { Cache } from 'cache-manager';
import Game from '@interfaces/game';
import { v4 as uuidv4 } from 'uuid';
import generateIp from '@utils/ip';
import config from '@config/config';
import { LcdService } from '@modules/lcd/lcd.service';
import { CountDown } from '@modules/countdown/countdown';
import { WebsocketGateway } from '@modules/websocket/websocket.gateway';
import { DoorService } from '@modules/door/door.service';
import { LogsService } from '@modules/logs/logs.service';

@Injectable()
export class AdminService extends Logger {
  private game: Game;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private lcdService: LcdService,
    private websocketGateway: WebsocketGateway,
    private doorService: DoorService,
    private logsService: LogsService,
  ) {
    super();
  }

  async newGame() {
    if (this.game) {
      this.game.time_remaining.stop();
      this.cacheManager.del('game');
    }

    this.game = {
      id: uuidv4(),
      ip: generateIp(),
      code: Math.floor(1000 + Math.random() * 9000),
      time_remaining: new CountDown(config.game.duration, (duration: number) => {
        this.websocketGateway.sendEvent('remaining', duration);
      }),
      running: true,
    };

    this.cacheManager.set('game', this.game);
    this.lcdService.write(`[het IP adres is]${this.game.ip}`); //[ represents the first line, ] represents the secund line
    this.doorService.onGameStart();

    this.logsService.log('game created');

    return {
      message: 'game created',
      code: this.game.code,
      ip: this.game.ip,
    };
  }

  sendHint(req) {
    const { body } = req;

    if (!this.game) {
      super.log(`there's currently no game running`);
      throw new HttpException("there's currently no game running", HttpStatus.NOT_FOUND);
    }

    if (!body) {
      throw new HttpException('body missing', HttpStatus.BAD_REQUEST);
    }

    this.websocketGateway.sendEvent('hint', body);
    this.logsService.log(`hint sent: '${body}'`);

    return {
      message: 'ok',
    };
  }
}
