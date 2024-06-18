// src/modules/gastos-fijos/gastos-fijos.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GastoFijo } from './entities/gastos-fijo.entity';
import { CreateGastoFijoDto } from './dto/create-gastos-fijo.dto';

@Injectable()
export class GastosFijosService {
  constructor(
    @InjectRepository(GastoFijo)
    private readonly gastoFijoRepository: Repository<GastoFijo>,
  ) {}

  async findAll(): Promise<GastoFijo[]> {
    return this.gastoFijoRepository.find();
  }

  async create(createGastoFijoDto: CreateGastoFijoDto): Promise<GastoFijo> {
    const { name, amount, date} = createGastoFijoDto;

    const newGastoFijo = this.gastoFijoRepository.create({
      name,
      amount,
      date, // Asegúrate de que la fecha esté en el formato correcto
      type: 'Gasto Fijo',
    });

    return await this.gastoFijoRepository.save(newGastoFijo);
  }
}
