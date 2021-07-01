import { Module } from '@nestjs/common';
import { SoundService } from './sound.service';
import { LogsModule } from '@modules/logs/logs.module';

@Module({
  imports: [LogsModule],
  providers: [SoundService],
  exports: [SoundService],
})
export class SoundModule {}
