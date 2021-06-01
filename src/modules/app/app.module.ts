import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AdminModule } from '@modules/admin/admin.module';
import { TerminalModule } from '@modules/terminal/terminal.module';
import { IpModule } from '@modules/ip/ip.module';
import { DoorModule } from '../door/door.module';

@Module({
  imports: [AdminModule, TerminalModule, IpModule, DoorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
