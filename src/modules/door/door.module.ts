import { Module, CacheModule } from '@nestjs/common';
import { DoorService } from './door.service';
import { KeypadModule } from '@modules/keypad/keypad.module';
import { LcdModule } from '@modules/lcd/lcd.module';

@Module({
  imports: [
    CacheModule.register({
      ttl: null,
    }),
    KeypadModule,
    LcdModule,
  ],
  providers: [DoorService],
})
export class DoorModule {}
