import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GastoVariable } from './entities/gastos-variable.entity';
import { CreateGastoVariableDto } from './dto/create-gastos-variable.dto';


@Injectable()
export class GastosVariablesService {
  constructor(
    @InjectRepository(GastoVariable)
    private readonly gastoVariableRepository: Repository<GastoVariable>,
  ) {}

  async findAll(): Promise<GastoVariable[]> {
    return this.gastoVariableRepository.find();
  }

  async create(createGastoVariableDto: CreateGastoVariableDto): Promise<GastoVariable> {
    const { name, amount, date } = createGastoVariableDto;

    const newGastoVariable = this.gastoVariableRepository.create({
      name,
      amount,
      date, // Asegúrate de que la fecha esté en el formato correcto
      type: 'Gasto Variable',
    });

    return await this.gastoVariableRepository.save(newGastoVariable);
  }
}
