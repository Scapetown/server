import { Module, CacheModule } from '@nestjs/common';
import { DoorService } from './door.service';
import { ArdruinoDoorModule } from '@modules/ardruinoDoor/ardruinoDoor.module';
import { LogsModule } from '@modules/logs/logs.module';

@Module({
  imports: [
    CacheModule.register({
      ttl: null,
    }),
    ArdruinoDoorModule,
    LogsModule,
  ],
  providers: [DoorService],
  exports: [DoorService],
})
export class DoorModule {}
