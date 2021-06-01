import { Body, Controller, Post } from '@nestjs/common';
import { TerminalService } from './terminal.service';

@Controller('terminal')
export class TerminalController {
  constructor(private readonly terminalService: TerminalService) {}

  @Post('check')
  checkCommand(@Body() body) {
    return this.terminalService.checkCommand(body);
  }
}
