import { Module, CacheModule } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { ArdruinoService } from '@modules/ardruino/ardruino.service';

@Module({
  imports: [
    CacheModule.register({
      ttl: null,
    }),
  ],
  providers: [AdminService, ArdruinoService],
  controllers: [AdminController],
})
export class AdminModule {}
