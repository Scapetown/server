import { Module, CacheModule } from '@nestjs/common';
import { DoorService } from './door.service';
import { DoorController } from './door.controller';

@Module({
  imports: [
    CacheModule.register({
      ttl: null,
    }),
  ],
  providers: [DoorService],
  controllers: [DoorController],
})
export class DoorModule {}
