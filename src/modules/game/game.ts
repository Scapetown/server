import { IGame } from '@interfaces/game';
import generateIp from '@utils/ip';
import getRandomTeamName from '@utils/teams';
import config from '@config/config';

export class Game implements IGame {
  public ip;
  public code;
  public team;
  public remaining;

  constructor() {
    this.ip = 0;
    this.code = 0;
    this.team = {
      name: '',
    };
    this.remaining = 0;
  }

  newGame() {
    this.ip = generateIp();
    this.code = Math.floor(1000 + Math.random() * 9000);
    this.team.name = getRandomTeamName();
    this.remaining = config.game.duration;
  }
}
