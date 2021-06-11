import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class WebsocketGateway extends Logger implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor() {
    super();
  }

  @WebSocketServer()
  private wss: Server;

  public afterInit() {
    super.log('wss initialized');
  }

  public handleConnection() {
    super.log('wss client connected');
  }

  public handleDisconnect() {
    super.log('wss client disconnected');
  }

  sendEvent(durationInSeconds: number) {
    this.wss.emit('remaining', { data: durationInSeconds });
  }
}
