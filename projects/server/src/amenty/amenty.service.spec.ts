import { Test, TestingModule } from '@nestjs/testing';
import { AmentyService } from './amenty.service';

describe('AmentyService', () => {
  let service: AmentyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AmentyService],
    }).compile();

    service = module.get<AmentyService>(AmentyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
