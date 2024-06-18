import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingreso } from './entities/ingreso.entity';
import { CreateIngresoDto } from './dto/create-ingreso.dto';

@Injectable()
export class IngresoService {
  constructor(
    @InjectRepository(Ingreso)
    private ingresoRepository: Repository<Ingreso>,
  ) {}

  async findAll(): Promise<Ingreso[]> {
    return this.ingresoRepository.find();
  }

  async getIngresoMensual(): Promise<number> {
    const ingresos = await this.ingresoRepository.find();
    const totalIngresoMensual = ingresos.reduce((sum, ingreso) => sum + ingreso.amount, 0);
    return totalIngresoMensual;
  }

  async create(createIngresoDto: CreateIngresoDto): Promise<Ingreso> {
    const nuevoIngreso = new Ingreso();
    nuevoIngreso.amount = createIngresoDto.amount;
    return this.ingresoRepository.save(nuevoIngreso);
  }
}