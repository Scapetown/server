import { Injectable, Logger } from '@nestjs/common';
import SerialPort from 'serialport';

@Injectable()
export class ArdruinoService extends Logger {
  private serialport;

  constructor() {
    super();
    this.serialport = new SerialPort('COM4');
  }

  showOnLcd(msg: string) {
    this.serialport.write(msg);
  }
}
