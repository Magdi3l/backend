import { Test, TestingModule } from '@nestjs/testing';
import { GastosFijosController } from './gastos-fijos.controller';
import { GastosFijosService } from './gastos-fijos.service';


describe('GastosFijosController', () => {
  let controller: GastosFijosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GastosFijosController],
      providers: [GastosFijosService],
    }).compile();

    controller = module.get<GastosFijosController>(GastosFijosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
