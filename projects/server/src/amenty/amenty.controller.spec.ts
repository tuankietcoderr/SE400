import { Test, TestingModule } from '@nestjs/testing';
import { AmentyController } from './amenty.controller';

describe('AmentyController', () => {
  let controller: AmentyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AmentyController],
    }).compile();

    controller = module.get<AmentyController>(AmentyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
