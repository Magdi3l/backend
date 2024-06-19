import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngresoModule } from './Module/control-gastos/ingreso/ingreso.module';
import { HistorialModule } from './Module/control-gastos/historial/historial.module';
import { AhorrosModule } from './Module/control-gastos/ahorros/ahorros.module';
import { GastosVariablesModule } from './Module/control-gastos/gastos-variables/gastos-variables.module';
import { GastosFijosModule } from './Module/control-gastos/gastos-fijos/gastos-fijos.module';
import { UsuarioModule } from './Module/Usuario/usuario.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1602',
      database: 'ODBO',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsuarioModule,
    IngresoModule,
    GastosFijosModule,
    GastosVariablesModule,
    AhorrosModule,
    HistorialModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
