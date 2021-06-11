import { Module, CacheModule } from '@nestjs/common';
import { DoorService } from './door.service';
// import { DoorController } from './door.controller';
import { KeypadModule } from '@modules/keypad/keypad.module';

@Module({
  imports: [
    CacheModule.register({
      ttl: null,
    }),
    KeypadModule,
  ],
  providers: [DoorService],
  // controllers: [DoorController],
})
export class DoorModule {}
