import { Injectable, Logger } from '@nestjs/common';
import SerialPort from 'serialport';

@Injectable()
export class LcdService extends Logger {
  private serialport;

  constructor() {
    super();
    this.serialport = new SerialPort('COM4');
  }

  write(msg: string) {
    this.serialport.write(msg);
  }

  reset() {
    this.serialport.write("[currently there's]no game running");
  }
}
