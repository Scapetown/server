import { Injectable, Logger } from '@nestjs/common';
import { WebsocketGateway } from '@modules/websocket/websocket.gateway';
import dayjs from '@utils/day';

@Injectable()
export class LogsService extends Logger {
  constructor(private websocketGateway: WebsocketGateway) {
    super();
  }

  log(message: string) {
    const timestamp: string = dayjs().format('HH:mm:ss');
    this.websocketGateway.sendEvent('logs', { timestamp, message });
    super.log(message);
  }
}
