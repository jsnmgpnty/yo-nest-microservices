import { AppExceptionFilter } from './app-exception.filter';

describe('ExceptionFilter', () => {
  it('should be defined', () => {
    expect(new AppExceptionFilter()).toBeDefined();
  });
});
