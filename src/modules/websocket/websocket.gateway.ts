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
  clients = [];

  public afterInit() {
    super.log('wss initialized');
  }

  public handleConnection(client: any) {
    this.clients.push(client);
  }

  public handleDisconnect(client: any) {
    for (let i = 0; i < this.clients.length; i++) {
      if (this.clients[i].id === client.id) {
        this.clients.splice(i, 1);
        return;
      }
    }
  }

  private broadcast(event: unknown, message: any) {
    const broadCastMessage = JSON.stringify(message);
    for (const c of this.clients) {
      c.emit(event, broadCastMessage);
    }
  }

  sendEvent(durationInSeconds: number) {
    this.broadcast('remaining', durationInSeconds);
  }
}
