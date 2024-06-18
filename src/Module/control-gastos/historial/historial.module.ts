import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistorialController } from './historial.controller';
import { HistorialService } from './historial.service';
import { Ahorro } from '../ahorros/entities/ahorro.entity';
import { GastoFijo } from '../gastos-fijos/entities/gastos-fijo.entity';
import { GastoVariable } from '../gastos-variables/entities/gastos-variable.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Ahorro, GastoFijo, GastoVariable])],
  controllers: [HistorialController],
  providers: [HistorialService],
})
export class HistorialModule {}
