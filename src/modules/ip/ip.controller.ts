import { Controller, Get } from '@nestjs/common';
import { IpService } from './ip.service';

@Controller('ip')
export class IpController {
  constructor(private readonly ipService: IpService) {}

  @Get()
  getIp() {
    return this.ipService.getIp();
  }
}
