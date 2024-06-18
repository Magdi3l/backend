// src/modules/gastos-fijos/gastos-fijos.controller.ts

import { Controller, Get, Post, Body } from '@nestjs/common';
import { GastosFijosService } from './gastos-fijos.service';
import { GastoFijo } from './entities/gastos-fijo.entity';
import { CreateGastoFijoDto } from './dto/create-gastos-fijo.dto';

@Controller('gastos-fijos')
export class GastosFijosController {
  constructor(private readonly gastosFijosService: GastosFijosService) {}

  @Get()
  async findAll(): Promise<GastoFijo[]> {
    return this.gastosFijosService.findAll();
  }

  @Post()
  async create(@Body() createGastoFijoDto: CreateGastoFijoDto): Promise<GastoFijo> {
    return this.gastosFijosService.create(createGastoFijoDto);
  }
}
