import Transport from 'winston-transport';
import axios from 'axios';

//
// Inherit from `winston-transport` so you can take advantage
// of the base functionality and `.exceptions.handle()`.
//
export class LogglyWinston extends Transport {
  private host: string;
  private token: string;
  private subdomain: string;

  constructor(opts) {
    super(opts);
    this.host = opts.host;
    this.token = opts.token;
    this.subdomain = opts.subdomain;
  }

  log(info: {level: string, message: string, timestamp: string}, callback) {
    setImmediate(() => {
      this.emit('logged', info);
    });

    // Try to parse message
    let messageParsed: any = undefined;
    try {
      messageParsed = JSON.parse(info.message);
    } catch(e) {}

    axios.post(`https://logs-01.loggly.com/inputs/${this.token}/tag/http/`, {
      host: this.host,
      subdomain: this.subdomain,
      level: info.level,
      timestamp: info.timestamp,
      message: info.message,
    }, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    
    callback();
  }
};