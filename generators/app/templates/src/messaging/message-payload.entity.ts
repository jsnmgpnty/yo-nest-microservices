export interface MessageTopicPayload<T extends IMessagePayload> {
  topicName: string;
  exchange: string;
  payload: T;
}

export interface IMessagePayload { };
