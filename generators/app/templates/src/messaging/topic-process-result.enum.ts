export enum TopicProcessResult {
  SuccessAndAcknowledge = 1,
  FailAndExit = 2,
  FailAndRetry = 3,
}
