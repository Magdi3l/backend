import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { CreateUsuarioDto } from './dtos/create-usuario.dto';
import { VerificationService } from './verificacion.service';

@Injectable()
export class UsuarioService {
  private readonly logger = new Logger(UsuarioService.name);
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
  ) {}

  async verificarCorreo(email: string): Promise<void> {
    this.logger.log(`Verificando existencia del correo: ${email}`);
    const usuario = await this.usuariosRepository.findOne({ where: { email } });
    this.logger.log(`Email encontrado: ${usuario}`);
    if (usuario) {
      throw new Error('Este correo ya está registrado');
    }
  }  

  async verificarCedula(cedula: string): Promise<void> {
    this.logger.log(`Verificando existencia de la cédula: ${cedula}`);
    const usuario = await this.usuariosRepository.findOne({ where: { cedula } });
    this.logger.log(`El usuario encontrado es: ${usuario}`);
    if (usuario) {
      throw new Error('La cédula ya está registrada');
    }
  }

  async verificarUsuario(usuario: string): Promise<void> {
    this.logger.log(`Verificando existencia de la cédula: ${usuario}`);
    const user = await this.usuariosRepository.findOne({ where: { nombre_usuario: usuario } });
    this.logger.log(`El usuario encontrado es: ${user}`);
    if (user) {
      throw new Error('El nombre de usuario ya está registrado');
    }
  }

  

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {  
    const usuario = this.usuariosRepository.create(createUsuarioDto);
    return this.usuariosRepository.save(usuario);
  }
}
