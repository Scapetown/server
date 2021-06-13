import { Injectable, CACHE_MANAGER, Inject, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Game } from '@interfaces/game';
import { ArdruinoDoorService } from '@modules/ardruinoDoor/ardruinoDoor.service';
import { LogsService } from '@modules/logs/logs.service';

@Injectable()
export class DoorService extends Logger {
  private doorCode;
  private codeState;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private ardruinoDoorService: ArdruinoDoorService,
    private logsService: LogsService,
  ) {
    super();
    this.doorCode = 0;
    this.codeState = 0;
    this.updateLcd();

    this.ardruinoDoorService.registerRead((code: string) => {
      this.checkCode(code);
    });
  }

  updateLcd() {
    switch (this.codeState) {
      case 0:
        this.ardruinoDoorService.write('[no active game');
        this.ardruinoDoorService.write(']');
        break;
      case 1:
        this.ardruinoDoorService.write('[enter code');
        this.ardruinoDoorService.write(']@');
        break;
      case 2:
        this.ardruinoDoorService.write(']#');
        break;
      case 3:
        this.ardruinoDoorService.write(']$');
        break;
      case 4:
        this.ardruinoDoorService.write(']%');
        break;
      case 5:
        this.ardruinoDoorService.write(']&');
        break;
      case 6:
        this.ardruinoDoorService.write('[door unlocked');
        this.ardruinoDoorService.write(']');
        break;
    }
  }

  async checkCode(code: string) {
    const game: Game = await this.cacheManager.get('game');
    const ch = code[0];

    if (!game) {
      this.doorCode = 0;
      return;
    }

    if (ch >= '0' && ch <= '9') {
      this.doorCode = this.doorCode * 10 + parseInt(ch);
      if (this.codeState <= 4) {
        this.codeState += 1;
      }
    }

    if (ch === '#') {
      if (game.code === this.doorCode) {
        this.logsService.log('code correct');
        this.ardruinoDoorService.open();
        this.codeState = 6;
      } else {
        this.logsService.log(`code incorrect got: ${this.doorCode} expected: ${game.code}`);
        this.codeState = 1;
      }

      this.doorCode = 0;
    }

    this.updateLcd();
  }

  openDoor() {
    this.ardruinoDoorService.open();
  }

  async onGameStart() {
    this.codeState = 1;
    this.updateLcd();
    this.ardruinoDoorService.close();
  }
}
