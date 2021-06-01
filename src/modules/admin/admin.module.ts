import { Module, CacheModule } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';

@Module({
  imports: [
    CacheModule.register({
      ttl: null,
    }),
  ],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
