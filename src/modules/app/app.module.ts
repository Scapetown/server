import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AdminModule } from '@modules/admin/admin.module';
import { TerminalModule } from '@modules/terminal/terminal.module';

@Module({
  imports: [AdminModule, TerminalModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
