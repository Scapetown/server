import { Module } from '@nestjs/common';
import { LogsService } from './logs.service';
import { WebsocketModule } from '@modules/websocket/websocket.module';

@Module({
  imports: [WebsocketModule],
  providers: [LogsService],
  exports: [LogsService],
})
export class LogsModule {}
