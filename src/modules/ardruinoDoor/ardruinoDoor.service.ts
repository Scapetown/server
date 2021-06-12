import { Injectable, Logger } from '@nestjs/common';
import SerialPort from 'serialport';
import Readline from '@serialport/parser-readline';

@Injectable()
export class ArdruinoDoorService extends Logger {
  private serialport;
  private parser;
  private startLog;

  constructor() {
    super();
    this.startLog = true;

    this.serialport = new SerialPort('COM3');

    this.parser = new Readline();
    this.serialport.pipe(this.parser);
    this.parser.on('data', (data) => {
      if (!this.startLog) {
        return;
      }
      super.log(`ardruino doorservice connected with: ${data}`);
      this.startLog = false;
    });
  }

  registerRead(read_cb) {
    this.parser.on('data', read_cb);
  }

  open() {
    this.serialport.write('o');
  }

  close() {
    this.serialport.write('c');
  }
}
