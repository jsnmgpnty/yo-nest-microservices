import { Injectable, Logger } from '@nestjs/common';
import * as _ from 'lodash';
import * as winston from 'winston';
import { ElasticsearchTransportOptions, ElasticsearchTransport } from 'winston-elasticsearch';
import { Client } from '@elastic/elasticsearch';
import { LoggerOptions } from './logger-options.model';

@Injectable()
export class LoggerService extends Logger {
  logger: winston.Logger;
  options: LoggerOptions;

  constructor (options: LoggerOptions) {
    super(options.appName, true);
    this.options = options;
    this.init();
    this.createLogger();
  }

  log (message: string) {
    super.log(message);
    this.logger.log('info', this.formatMessage(message));
  }

  error (message: string, error: any) {
    super.error(message, error?.stack || error);
    this.logger.log('error', this.formatMessage(message), error);
  }

  warn (message: string) {
    super.warn(message);
    this.logger.log('warn', this.formatMessage(message));
  }

  private init() {
    if (!this.options) this.options = { appName: 'API' };
  }

  private createLogger() {
    const logger: winston.Logger = winston.createLogger();

    logger.exitOnError = false;
    logger.format = winston.format.combine(
      winston.format.json(),
      winston.format.timestamp()
    );

    if (this.options.elasticSearch) {
      const client = new Client({ node: this.options.elasticSearch.url });
      const esOpts: ElasticsearchTransportOptions = { client, index: this.options.elasticSearch.index };
      logger.add(new ElasticsearchTransport(esOpts));
    }

    if (this.options.file) logger.add(new winston.transports.File(this.options.file));
    if (this.options.console) logger.add(new winston.transports.Console(this.options.console));

    this.logger = logger;
  }

  private formatMessage (message: string) {
    return `[${this.options.appName}] - ${message}`;
  }
}
