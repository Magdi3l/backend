import { Module } from '@nestjs/common';
import { AhorrosController } from './ahorros.controller';
import { AhorrosService } from './ahorros.service';
import { Ahorro } from './entities/ahorro.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([Ahorro])],
  controllers: [AhorrosController],
  providers: [AhorrosService],
})
export class AhorrosModule {}
