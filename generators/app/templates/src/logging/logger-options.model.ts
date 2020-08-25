import { ConsoleTransportOptions, FileTransportOptions } from 'winston/lib/winston/transports';

export interface LoggerOptions {
  file?: FileTransportOptions;
  console?: ConsoleTransportOptions;
  elasticSearch?: ESTransportOptions;
  appName: string;
}

export interface ESTransportOptions {
  url: string;
  index: string;
}
