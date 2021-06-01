import { Controller, Post, Body } from '@nestjs/common';
import { DoorService } from './door.service';

@Controller('door')
export class DoorController {
  constructor(private readonly doorService: DoorService) {}

  @Post('check')
  checkCode(@Body() body) {
    return this.doorService.checkCode(body);
  }
}
