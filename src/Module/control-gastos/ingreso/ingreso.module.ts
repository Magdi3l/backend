import { Module } from '@nestjs/common';
import { Ingreso } from './entities/ingreso.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngresoController } from './ingreso.controller';
import { IngresoService } from './ingreso.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ingreso])],
  controllers: [IngresoController],
  providers: [IngresoService],
})
export class IngresoModule {}
