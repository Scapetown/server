import { Injectable, CACHE_MANAGER, Inject, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { Cache } from 'cache-manager';
import config from '@config/config';
import { LcdService } from '@modules/lcd/lcd.service';
import { CountDown } from '@modules/countdown/countdown';
import { WebsocketGateway } from '@modules/websocket/websocket.gateway';
import { DoorService } from '@modules/door/door.service';
import { LogsService } from '@modules/logs/logs.service';
import { SoundService } from '@modules/sound/sound.service';
import { Game } from '@modules/game/game';
@Injectable()
export class AdminService extends Logger {
  private game: Game;
  private countdown: CountDown;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private lcdService: LcdService,
    private websocketGateway: WebsocketGateway,
    private doorService: DoorService,
    private logs: LogsService,
    private soundService: SoundService,
  ) {
    super();
    this.game = new Game();
  }

  async newGame() {
    if (this.countdown) {
      this.countdown.stop();
    }

    this.game.create();
    this.cacheManager.set('game', this.game);

    this.countdown = new CountDown(this.game.remaining, (duration: number) => {
      this.game.remaining = duration;
      this.websocketGateway.sendEvent('remaining', duration);
    });

    this.lcdService.write(`[het IP adres is]${this.game.ip}`); //[ represents the first line, ] represents the secund line
    this.websocketGateway.sendEvent('team', this.game.team);
    this.doorService.onGameStart();
    this.soundService.play('startup.wav');

    this.logs.log('game created');

    return {
      message: 'game created',
      code: this.game.code,
      ip: this.game.ip,
    };
  }

  sendHint(req) {
    const { body } = req;

    if (!this.game) {
      throw new HttpException("there's currently no game running", HttpStatus.NOT_FOUND);
    }

    if (!body) {
      throw new HttpException('body missing', HttpStatus.BAD_REQUEST);
    }

    this.websocketGateway.sendEvent('hint', body);
    this.logs.log(`hint sent: '${body}'`);

    return {
      message: 'ok',
    };
  }

  openDoor() {
    if (!this.game) {
      throw new HttpException("there's currently no game running", HttpStatus.NOT_FOUND);
    }

    this.doorService.openDoor();
    this.logs.log('door opened');
  }

  setTeam(req) {
    const { name } = req;

    if (!this.game) {
      throw new HttpException("there's currently no game running", HttpStatus.NOT_FOUND);
    }

    if (!name) {
      throw new HttpException('team name missing', HttpStatus.BAD_REQUEST);
    }

    this.websocketGateway.sendEvent('team', name);
    this.game.team.name = name;
    this.logs.log(`team: '${this.game.team.name}'`);

    return {
      message: 'ok',
    };
  }
}
