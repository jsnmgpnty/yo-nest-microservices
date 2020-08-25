import { Test, TestingModule } from '@nestjs/testing';
import { BaseService } from './base.service';
import { BaseEntity } from '../models';

class DummyClass extends BaseEntity {}

describe('BaseService', () => {
  let service: BaseService<DummyClass>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BaseService],
    }).compile();

    service = module.get<BaseService<DummyClass>>(BaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
