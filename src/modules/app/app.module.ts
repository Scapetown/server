import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AdminModule } from '@modules/admin/admin.module';
import { TerminalModule } from '@modules/terminal/terminal.module';
import { DoorModule } from '@modules/door/door.module';
import { LcdModule } from '@modules/lcd/lcd.module';
import { ArdruinoDoorModule } from '@modules/ardruinoDoor/ardruinoDoor.module';
import { SoundModule } from '@modules/sound/sound.module';

@Module({
  imports: [TerminalModule, DoorModule, LcdModule, AdminModule, ArdruinoDoorModule, SoundModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
