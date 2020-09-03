export interface MessageTopicPayload<T extends MessagePayload> {
  topicName: string;
  exchange: string;
  payload: T;
}

export interface MessagePayload { };
