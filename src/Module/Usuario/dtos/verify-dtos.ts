import { IsString, Length } from 'class-validator';

export class VerifyCedulaDto {
  @IsString()
  @Length(10, 10, { message: 'El número de cédula debe tener 10 dígitos' })
  cedula: string;
}

export class VerifyUsuarioDto {
  @IsString({ message: 'El nombre de usuario no puede estar vacío' })
  usuario: string;
}