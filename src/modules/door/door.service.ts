import { Injectable, CACHE_MANAGER, Inject, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import Game from '@interfaces/game';
import { ArdruinoDoorService } from '@modules/ardruinoDoor/ardruinoDoor.service';
import { LcdService } from '@modules/lcd/lcd.service';

@Injectable()
export class DoorService extends Logger {
  private doorCode;
  private codeStars;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private ardruinoDoorService: ArdruinoDoorService,
    private lcdService: LcdService,
  ) {
    super();
    this.doorCode = 0;
    this.codeStars = ']';

    this.ardruinoDoorService.registerRead((code: string) => {
      this.checkCode(code);
    });
  }

  async checkCode(code: string) {
    const game: Game = await this.cacheManager.get('game');
    const ch = code[0];

    if (!game) {
      super.log("currently there's no game running");
      this.doorCode = 0;
      return;
    }

    if (ch >= '0' && ch <= '9') {
      this.doorCode = this.doorCode * 10 + parseInt(ch);
      this.codeStars = this.codeStars + '*';
    }

    if (ch === '#') {
      if (game.code === this.doorCode) {
        super.log('code correct');
        this.ardruinoDoorService.open();
        this.lcdService.reset();
        this.ardruinoDoorService.write('[door unlocked');
      } else {
        super.log(`code incorrect got: ${this.doorCode} expected: ${game.code}`);
      }

      this.codeStars = ']';
      this.doorCode = 0;
    }

    this.ardruinoDoorService.write(this.codeStars);
  }

  async onGameStart() {
    this.ardruinoDoorService.write('[enter code]');
    this.ardruinoDoorService.close();
  }
}
