import { Test, TestingModule } from '@nestjs/testing';
import { GastosFijosService } from './gastos-fijos.service';


describe('GastosFijosService', () => {
  let service: GastosFijosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GastosFijosService],
    }).compile();

    service = module.get<GastosFijosService>(GastosFijosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
