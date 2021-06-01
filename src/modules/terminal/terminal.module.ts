import { Module, CacheModule } from '@nestjs/common';
import { TerminalController } from './terminal.controller';
import { TerminalService } from './terminal.service';

@Module({
  imports: [
    CacheModule.register({
      ttl: null,
    }),
  ],
  controllers: [TerminalController],
  providers: [TerminalService],
})
export class TerminalModule {}
