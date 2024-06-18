import { Controller, Get, Post, Body } from '@nestjs/common';
import { GastosVariablesService } from './gastos-variables.service';
import { GastoVariable } from './entities/gastos-variable.entity';
import { CreateGastoVariableDto } from './dto/create-gastos-variable.dto';

@Controller('gastos-variables')
export class GastosVariablesController {
  constructor(private readonly gastosVariablesService: GastosVariablesService) {}

  @Get()
  async findAll(): Promise<GastoVariable[]> {
    return this.gastosVariablesService.findAll();
  }

  @Post()
  async create(@Body() createGastoVariableDto: CreateGastoVariableDto): Promise<GastoVariable> {
    return this.gastosVariablesService.create(createGastoVariableDto);
  }
}
