import { Injectable, Logger } from '@nestjs/common';
import SerialPort from 'serialport';
import Readline from '@serialport/parser-readline';

@Injectable()
export class KeypadService extends Logger {
  private serialport;
  private parser;

  constructor() {
    super();
    this.serialport = new SerialPort('COM3');

    this.parser = new Readline();
    this.serialport.pipe(this.parser);
  }

  registerRead(read_cb) {
    this.parser.on('data', read_cb);
  }
}
