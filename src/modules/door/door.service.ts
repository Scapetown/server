import { Injectable, CACHE_MANAGER, Inject, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import Game from '@interfaces/game';
import { KeypadService } from '@modules/keypad/keypad.service';
import { LcdService } from '@modules/lcd/lcd.service';

@Injectable()
export class DoorService extends Logger {
  private doorCode;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private keypadService: KeypadService,
    private lcdService: LcdService,
  ) {
    super();
    this.doorCode = 0;

    this.keypadService.registerRead((code: string) => {
      this.checkCode(code);
    });
  }

  async checkCode(code: string) {
    const game: Game = await this.cacheManager.get('game');
    const ch = code[0];

    if (!game) {
      console.log("currently there's no game running");
      this.doorCode = 0;
      return;
    }

    if (ch >= '0' && ch <= '9') {
      this.doorCode = this.doorCode * 10 + parseInt(ch);
    }

    if (ch === '#') {
      if (game.code === this.doorCode) {
        //open door servo
        this.lcdService.reset();
      }
      this.doorCode = 0;
    }
  }
}
