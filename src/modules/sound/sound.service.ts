import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { LogsService } from '@modules/logs/logs.service';
import config from '@config/config';

@Injectable()
export class SoundService {
  constructor(private logs: LogsService) {}

  play(file: string) {
    this.logs.log(`playing ${file}`);
    exec(`"${config.server.mplayer_path}" ./src/modules/sound/sounds/${file}`, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });
  }
}
