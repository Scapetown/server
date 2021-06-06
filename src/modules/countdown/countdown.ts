export class CountDown {
  constructor(durationInSeconds: number, onTimerTick) {
    const intervalId = setInterval(() => {
      durationInSeconds -= 1;
      if (durationInSeconds === 0) {
        clearInterval(intervalId);
      }

      onTimerTick(durationInSeconds);
    }, 1000);
  }
}
