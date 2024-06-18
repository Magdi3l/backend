// src/module/ahorros/ahorros.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ahorro } from './entities/ahorro.entity';
import { CreateAhorroDto } from './dto/create-ahorro.dto';

@Injectable()
export class AhorrosService {
  constructor(
    @InjectRepository(Ahorro)
    private readonly ahorroRepository: Repository<Ahorro>,
  ) {}

  async create(createAhorroDto: CreateAhorroDto): Promise<Ahorro> {
    const { name, amount, date } = createAhorroDto;

    const newAhorro = this.ahorroRepository.create({
      name,
      amount,
      date,
      type: 'Ahorro', // Aquí se establece el tipo
    });

    return await this.ahorroRepository.save(newAhorro);
  }

  async findAll(): Promise<Ahorro[]> {
    return this.ahorroRepository.find();
  }
}
