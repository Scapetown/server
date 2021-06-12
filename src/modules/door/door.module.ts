import { Module, CacheModule } from '@nestjs/common';
import { DoorService } from './door.service';
import { ArdruinoDoorModule } from '@modules/ardruinoDoor/ardruinoDoor.module';
import { LcdModule } from '@modules/lcd/lcd.module';

@Module({
  imports: [
    CacheModule.register({
      ttl: null,
    }),
    ArdruinoDoorModule,
    LcdModule,
  ],
  providers: [DoorService],
  exports: [DoorService],
})
export class DoorModule {}
