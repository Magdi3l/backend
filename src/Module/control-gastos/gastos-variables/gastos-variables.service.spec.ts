import { Test, TestingModule } from '@nestjs/testing';
import { GastosVariablesService } from './gastos-variables.service';

describe('GastosVariablesService', () => {
  let service: GastosVariablesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GastosVariablesService],
    }).compile();

    service = module.get<GastosVariablesService>(GastosVariablesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
