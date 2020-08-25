export interface MessagingOptions {
  exchanges: MessageQueueOptions[];
  uri: string;
  connectionInitOptions: MessageConnectionOptions;
}

export interface MessageQueueOptions {
  name: string;
  type: string;
}

export interface MessageConnectionOptions {
  wait: boolean;
}
