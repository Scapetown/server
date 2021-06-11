import { Module } from '@nestjs/common';
import { KeypadService } from './keypad.service';

@Module({
  providers: [KeypadService],
  exports: [KeypadService],
})
export class KeypadModule {}
