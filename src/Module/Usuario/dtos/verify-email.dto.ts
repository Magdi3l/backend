import { IsEmail, IsNotEmpty } from 'class-validator';

export class VerifyEmailDto {
  @IsEmail({}, {message:'Ingresa un email valido'})
  @IsNotEmpty({message:'El email es requerido'})
  email: string;
}