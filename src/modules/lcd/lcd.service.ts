import config from '@config/config';
import { Injectable, Logger } from '@nestjs/common';
import SerialPort from 'serialport';

@Injectable()
export class LcdService extends Logger {
  private serialport;

  constructor() {
    super();
    this.serialport = new SerialPort(config.server.lcdCom);
  }

  write(msg: string) {
    this.serialport.write(msg);
  }

  reset() {
    this.serialport.write("[currently there's]no game running");
  }
}
