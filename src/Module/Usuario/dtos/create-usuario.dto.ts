import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUsuarioDto {

    @IsNotEmpty({message:'El email es un campo obligatorio'})
  @IsEmail({}, {message:'Ingresa un email valido'})
  email: string;

  @IsNotEmpty({message:'El nombre es un campo obligatorio'})
  @IsString({message:'Ingresa un nombre valido'})
  nombre: string;

  @IsNotEmpty({message:'El apellido es un campo obligatorio'})
  @IsString({message:'Ingresa un apellido valido'})
  apellido: string;

  @IsNotEmpty({message:'El nombre de usuario es un campo obligatorio'})
  @IsString({message:'Ingresa un nombre de usuario valido'})
  nombre_usuario: string;

  @IsNotEmpty({message:'El numero cedula es un campo obligatorio'})
  @IsString({message:'Ingresa un numero cedula valido'})
  cedula: string;

  @IsNotEmpty({message:'El telefono es un campo obligatorio'})
  @IsString({message:'Ingresa un telefono valido'})
  @MinLength(9, { message: 'El número de teléfono debe tener 9 caracteres' })
  @MaxLength(9, { message: 'El número de teléfono debe tener 9 caracteres' })
  telefono: string;

  @IsNotEmpty({message:'La contraseña es un campo obligatorio'})
  @MinLength(8, {message:'Ingresa una contraseña valido'})
  @Matches(/(?=.*[a-z])/, { message: 'La contraseña debe tener al menos una letra minúscula' })
  @Matches(/(?=.*[A-Z])/, { message: 'La contraseña debe tener al menos una letra mayúscula' })
  @Matches(/(?=.*\d)/, { message: 'La contraseña debe tener al menos un número' })
  contraseña: string;
}


