import { IsString, IsNumber, IsDate, IsDateString } from 'class-validator';

export class CreateGastoVariableDto {
  @IsString()
  name: string;

  @IsNumber()
  amount: number;

  @IsDateString()
  date: Date;
}
