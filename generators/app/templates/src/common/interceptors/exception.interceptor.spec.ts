import { ExceptionInterceptor } from './exception.interceptor';

describe('ExceptionInterceptor', () => {
  it('should be defined', () => {
    expect(new ExceptionInterceptor(null)).toBeDefined();
  });
});
