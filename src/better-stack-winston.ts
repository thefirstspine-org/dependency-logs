import Transport from 'winston-transport';

//
// Inherit from `winston-transport` so you can take advantage
// of the base functionality and `.exceptions.handle()`.
//
export class BetterStackWinston extends Transport {

  private service: string;

  constructor(opts) {
    super(opts);
    this.service = opts.service;
  }

  log(info: {level: string, message: string, timestamp: string}, callback) {
    setImmediate(() => {
      this.emit('logged', info);
    });

    this.sendLog(info);
    
    callback();
  }

  private sendLog(info: {level: string, message: string, timestamp: string}) {
    console.log(JSON.stringify({
      ...info,
      service: this.service,
    }));
  }
};