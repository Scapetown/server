import { Module, CacheModule } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { ArdruinoModule } from '@modules/ardruino/ardruino.module';

@Module({
  imports: [
    CacheModule.register({
      ttl: null,
    }),
    ArdruinoModule,
  ],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
