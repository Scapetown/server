import { Module } from '@nestjs/common';
import { ArdruinoDoorService } from './ardruinoDoor.service';

@Module({
  providers: [ArdruinoDoorService],
  exports: [ArdruinoDoorService],
})
export class ArdruinoDoorModule {}
