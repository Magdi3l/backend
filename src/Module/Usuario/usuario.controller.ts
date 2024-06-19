import { Controller, Post, Body, HttpCode, HttpStatus, Logger, HttpException, BadRequestException, Put, Param } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dtos/create-usuario.dto';
import { VerifyEmailDto } from './dtos/verify-email.dto';
import { VerificationService } from './verificacion.service';
import { VerifyCedulaDto, VerifyUsuarioDto } from './dtos/verify-dtos';
import { LoginDto } from './dtos/login.dto';
import { UpdateUsuarioDto } from './dtos/update.dto';

@Controller('usuarios')
export class UsuarioController {
  private readonly logger = new Logger(UsuarioController.name);

  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly verificationService: VerificationService
  ) {}

  @Put('edit_usuario/:id')
  async updateUsuario(@Param('id') id: number, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return await this.usuarioService.update(id, updateUsuarioDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      const usuario = await this.usuarioService.validateUser(loginDto.username, loginDto.password);
      if (!usuario) {
        throw new HttpException('Credenciales inválidas', HttpStatus.UNAUTHORIZED);
      }
      return usuario;
    } catch (error) {
      throw new HttpException('Error de inicio de sesión', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('verificar_correo')
  async verificarCorreo(@Body() verifyEmailDto: VerifyEmailDto) {
    try {
      await this.usuarioService.verificarCorreo(verifyEmailDto.email);
      return { success: true };
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Este correo ya está registrado'
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('enviar_codigo_email')
  @HttpCode(HttpStatus.OK)
  async enviarCodigoEmail(@Body('email') email: string) {
    try {
      const response = await this.verificationService.sendVerificationEmail(email);
      return response;
    } catch (error: unknown) {
      this.logger.error(`Error al enviar el código de verificación a ${email}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw new HttpException('Error al enviar el código de verificación. Inténtalo de nuevo más tarde.', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('verificar_codigo_email')
  async verificarCodigoEmail(@Body() body: { email: string; codigo_verificacion: string }) {
    try {
      const result = await this.verificationService.verifyEmailCode(body.email, body.codigo_verificacion);
      return result;
    } catch (error: unknown) {
      this.logger.error(`Error al verificar el código para el correo: ${body.email}, ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw new HttpException('Error interno del servidor', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('verificar_cedula')
  async verificarCedula(@Body() verifyCedulaDto: VerifyCedulaDto) {
    this.logger.log(`Iniciando la verificación de cédula: ${verifyCedulaDto.cedula}`);
    try {
      await this.usuarioService.verificarCedula(verifyCedulaDto.cedula);
      this.logger.log(`Cédula verificada exitosamente: ${verifyCedulaDto.cedula}`);
      return { success: true };
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Este numero de cedula ya esta registrada'
      },HttpStatus.BAD_REQUEST);
    }
  }

  @Post('verificar_usuario')
  async verificarUsuario(@Body() verifyUsuarioDto: VerifyUsuarioDto) {
    this.logger.log(`Iniciando la verificación de nombre de usuario: ${verifyUsuarioDto.usuario}`);
    try {
      await this.usuarioService.verificarUsuario(verifyUsuarioDto.usuario);
      this.logger.log(`Nombre de usuario verificado exitosamente: ${verifyUsuarioDto.usuario}`);
      return { success: true };
    } catch (error) {
      this.logger.error(`Error al verificar el nombre de usuario: ${verifyUsuarioDto.usuario}, ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Este nombre de usuario ya esta en uso'
      },HttpStatus.BAD_REQUEST);
    }
  }

  @Post('enviar_codigo_telefono')
  async enviarCodigoTelefono(@Body('telefono') telefono: string) {
    try {
      return await this.verificationService.sendVerificationTelefono(telefono);
    } catch (error: any) {
      this.logger.error(`Error al enviar el código de verificación a ${telefono}: ${error.message}`);
      throw new HttpException('Error al enviar el código de verificación. Inténtalo de nuevo más tarde.', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('verificar_codigo_telefono')
  async verificarCodigoTelefono(@Body() body: { telefono: string; codigo_verificacion: string }) {
    try {
      return await this.verificationService.verifyTelefonoCode(body.telefono, body.codigo_verificacion);
    } catch (error: any) {
      this.logger.error(`Error al verificar el código para el teléfono ${body.telefono}: ${error.message}`);
      throw new HttpException('Error interno del servidor', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('crear_cuenta')
  async crearCuenta(@Body() createUsuarioDto: CreateUsuarioDto) {
    this.logger.log(`Iniciando la verificación de nombre de usuario: ${createUsuarioDto}`);
    try {
      const usuario = await this.usuarioService.create(createUsuarioDto);
      return usuario;
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Este numero de cedula ya esta registrada'
      },HttpStatus.BAD_REQUEST);
    }
  }


  
}
