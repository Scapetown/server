import { Module } from '@nestjs/common';
import { ArdruinoService } from './ardruino.service';

@Module({
  providers: [ArdruinoService],
  exports: [ArdruinoService],
})
export class ArdruinoModule {}
