export interface RedisSubscription {
  channel: string;
  callback: (response: string) => void;
}