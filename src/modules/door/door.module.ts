import { Module, CacheModule } from '@nestjs/common';
import { DoorService } from './door.service';
import { KeypadModule } from '@modules/keypad/keypad.module';

@Module({
  imports: [
    CacheModule.register({
      ttl: null,
    }),
    KeypadModule,
  ],
  providers: [DoorService],
})
export class DoorModule {}
