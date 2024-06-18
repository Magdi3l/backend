import { IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateAhorroDto {
  @IsString()
  name: string;

  @IsNumber()
  amount: number;

  @IsDateString()
  date: Date;
}
