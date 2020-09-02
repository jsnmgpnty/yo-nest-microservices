import { RequestSanitizerInterceptor } from './request-sanitizer.interceptor';

describe('RequestSanitizerInterceptor', () => {
  it('should be defined', () => {
    expect(new RequestSanitizerInterceptor()).toBeDefined();
  });
});
