import { Test, TestingModule } from '@nestjs/testing';
import { GastosVariablesController } from './gastos-variables.controller';
import { GastosVariablesService } from './gastos-variables.service';


describe('GastosVariablesController', () => {
  let controller: GastosVariablesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GastosVariablesController],
      providers: [GastosVariablesService],
    }).compile();

    controller = module.get<GastosVariablesController>(GastosVariablesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
