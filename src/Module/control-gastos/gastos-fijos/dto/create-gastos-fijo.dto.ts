import { IsString, IsNumber, IsDate, IsDateString } from 'class-validator';

export class CreateGastoFijoDto {
  @IsString()
  name: string;

  @IsNumber()
  amount: number;

  @IsDateString()
  date: Date;
}
