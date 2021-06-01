import { Module, CacheModule } from '@nestjs/common';
import { IpController } from './ip.controller';
import { IpService } from './ip.service';

@Module({
  imports: [
    CacheModule.register({
      ttl: null,
    }),
  ],
  controllers: [IpController],
  providers: [IpService],
})
export class IpModule {}
