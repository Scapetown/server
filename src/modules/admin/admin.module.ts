import { Module, CacheModule } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { LcdModule } from '@modules/lcd/lcd.module';
import { WebsocketModule } from '@modules/websocket/websocket.module';

@Module({
  imports: [
    CacheModule.register({
      ttl: null,
    }),
    LcdModule,
    WebsocketModule,
  ],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
