import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GastoVariable } from './entities/gastos-variable.entity';
import { GastosVariablesController } from './gastos-variables.controller';
import { GastosVariablesService } from './gastos-variables.service';

@Module({
  imports: [TypeOrmModule.forFeature([GastoVariable])], 
  controllers: [GastosVariablesController],
  providers: [GastosVariablesService],
})
export class GastosVariablesModule {}
