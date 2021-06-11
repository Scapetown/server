import { Module } from '@nestjs/common';
import { LcdService } from './lcd.service';

@Module({
  providers: [LcdService],
  exports: [LcdService],
})
export class LcdModule {}
