import { Module } from '@nestjs/common';
import { ArdruinoService } from './ardruino.service';

@Module({
  providers: [ArdruinoService],
})
export class ArdruinoModule {}
