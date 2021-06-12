import { Module, CacheModule } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { LcdModule } from '@modules/lcd/lcd.module';
import { WebsocketModule } from '@modules/websocket/websocket.module';
import { DoorModule } from '@modules/door/door.module';

@Module({
  imports: [
    CacheModule.register({
      ttl: null,
    }),
    LcdModule,
    WebsocketModule,
    DoorModule,
  ],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
