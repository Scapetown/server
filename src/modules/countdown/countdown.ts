export class CountDown {
  private durationInSeconds: number;
  private interval;

  constructor(durationInSeconds, onTimerTick) {
    this.start(durationInSeconds, onTimerTick);
  }

  start(durationInSeconds: number, onTimerTick) {
    this.durationInSeconds = durationInSeconds;

    this.interval = setInterval(() => {
      this.durationInSeconds -= 1;
      if (this.durationInSeconds === 0) {
        clearInterval(this.interval);
      }

      onTimerTick(this.durationInSeconds);
    }, 1000);
  }

  stop() {
    clearInterval(this.interval);
  }
}
