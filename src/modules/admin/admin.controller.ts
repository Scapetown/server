import { Body, Controller, Post } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('game')
  newGame() {
    return this.adminService.newGame();
  }

  @Post('hint')
  sendHint(@Body() body) {
    return this.adminService.sendHint(body);
  }

  @Post('open')
  openDoor() {
    return this.adminService.openDoor();
  }

  @Post('team')
  setTeam(@Body() body) {
    return this.adminService.setTeam(body);
  }
}
