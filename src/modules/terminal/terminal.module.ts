import { Module, CacheModule } from '@nestjs/common';
import { TerminalController } from './terminal.controller';
import { TerminalService } from './terminal.service';
import { LogsModule } from '@modules/logs/logs.module';
import { SoundModule } from '@modules/sound/sound.module';

@Module({
  imports: [
    CacheModule.register({
      ttl: null,
    }),
    LogsModule,
    SoundModule,
  ],
  controllers: [TerminalController],
  providers: [TerminalService],
})
export class TerminalModule {}
