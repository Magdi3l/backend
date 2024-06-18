import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ahorro } from '../ahorros/entities/ahorro.entity';
import { GastoFijo } from '../gastos-fijos/entities/gastos-fijo.entity';
import { GastoVariable } from '../gastos-variables/entities/gastos-variable.entity';

@Injectable()
export class HistorialService {
  constructor(
    @InjectRepository(Ahorro)
    private readonly ahorroRepository: Repository<Ahorro>,
    @InjectRepository(GastoFijo)
    private readonly gastoFijoRepository: Repository<GastoFijo>,
    @InjectRepository(GastoVariable)
    private readonly gastoVariableRepository: Repository<GastoVariable>,
  ) {}

  async getHistorial(): Promise<any[]> {
    const ahorros = await this.ahorroRepository.find();
    const gastosFijos = await this.gastoFijoRepository.find();
    const gastosVariables = await this.gastoVariableRepository.find();

    const historial = [
      ...ahorros.map(item => ({ ...item, type: 'Ahorro' })),
      ...gastosFijos.map(item => ({ ...item, type: 'Gasto Fijo' })),
      ...gastosVariables.map(item => ({ ...item, type: 'Gasto Variable' })),
    ];

    return historial;
  }
}
