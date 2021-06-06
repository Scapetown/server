import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AdminModule } from '@modules/admin/admin.module';
import { TerminalModule } from '@modules/terminal/terminal.module';
import { DoorModule } from '@modules/door/door.module';
import { ArdruinoModule } from '@modules/ardruino/ardruino.module';

@Module({
  imports: [TerminalModule, DoorModule, ArdruinoModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
