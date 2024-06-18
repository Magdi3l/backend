import { Controller, Get, Post, Body } from '@nestjs/common';
import { AhorrosService } from './ahorros.service';
import { Ahorro } from './entities/ahorro.entity';
import { CreateAhorroDto } from './dto/create-ahorro.dto';

@Controller('ahorros')
export class AhorrosController {
  constructor(private readonly ahorrosService: AhorrosService) {}

  @Post()
  async create(@Body() createAhorroDto: CreateAhorroDto): Promise<Ahorro> {
    return this.ahorrosService.create(createAhorroDto);
  }

  @Get()
  async findAll(): Promise<Ahorro[]> {
    return this.ahorrosService.findAll();
  }
}
