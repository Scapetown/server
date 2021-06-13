import { Module, CacheModule } from '@nestjs/common';
import { TerminalController } from './terminal.controller';
import { TerminalService } from './terminal.service';
import { LogsModule } from '@modules/logs/logs.module';

@Module({
  imports: [
    CacheModule.register({
      ttl: null,
    }),
    LogsModule,
  ],
  controllers: [TerminalController],
  providers: [TerminalService],
})
export class TerminalModule {}
