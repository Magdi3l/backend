import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GastoFijo } from './entities/gastos-fijo.entity';
import { GastosFijosController } from './gastos-fijos.controller';
import { GastosFijosService } from './gastos-fijos.service';


@Module({
  imports: [TypeOrmModule.forFeature([GastoFijo])],
  controllers: [GastosFijosController],
  providers: [GastosFijosService],
})
export class GastosFijosModule {}
