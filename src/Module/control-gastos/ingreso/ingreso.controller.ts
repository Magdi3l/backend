import { Controller, Get, Post, Body } from '@nestjs/common';
import { IngresoService } from './ingreso.service';
import { Ingreso } from './entities/ingreso.entity';
import { CreateIngresoDto } from './dto/create-ingreso.dto';

@Controller('ingresos')
export class IngresoController {
  constructor(private readonly ingresoService: IngresoService) {}

  @Get()
  async findAll(): Promise<Ingreso[]> {
    return this.ingresoService.findAll();
  }

  @Get('/mensual')
  async getIngresoMensual(): Promise<number> {
    return this.ingresoService.getIngresoMensual();
  }

  @Post()
  async create(@Body() createIngresoDto: CreateIngresoDto): Promise<Ingreso> {
    return this.ingresoService.create(createIngresoDto);
  }
}