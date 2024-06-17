import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio/lib';

@Injectable()
export class VerificationService {
  private readonly logger = new Logger(VerificationService.name);
  private twilioClient: Twilio;

  constructor(private configService: ConfigService) {
    this.twilioClient = new Twilio(
      this.configService.get<string>('TWILIO_ACCOUNT_SID'),
      this.configService.get<string>('TWILIO_AUTH_TOKEN'),
    );
  }

  async sendVerificationEmail(email: string): Promise<{ success?: string; error?: string }> {
    try {
      const verification = await this.twilioClient.verify.services(
        this.configService.get<string>('TWILIO_VERIFICATION_SID')
      ).verifications.create({ to: email, channel: 'email' });

      if (verification.status === 'pending') {
        this.logger.log('Código de verificación enviado exitosamente por correo electrónico');
        return { success: 'Código de verificación enviado exitosamente' };
      } else {
        this.logger.error('Error al enviar el código de verificación por correo electrónico');
        return { error: 'Error al enviar el código de verificación' };
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(`Error al enviar el código de verificación por correo electrónico: ${error.message}`);
        return { error: `Error al enviar el código de verificación: ${error.message}` };
      } else {
        this.logger.error('Error al enviar el código de verificación por correo electrónico: Un error desconocido ocurrió');
        return { error: 'Error desconocido al enviar el código de verificación' };
      }
    }
  }

  async verifyEmailCode(email: string, code: string): Promise<{ success?: string; error?: string }> {
    try {
      const verificationCheck = await this.twilioClient.verify.services(
        this.configService.get<string>('TWILIO_VERIFICATION_SID')
      ).verificationChecks.create({ to: email, code });

      if (verificationCheck.status === 'approved') {
        this.logger.log('Código de verificación correcto');
        return { success: 'Código de verificación correcto' };
      } else {
        this.logger.error('Código de verificación incorrecto');
        return { error: 'Código de verificación incorrecto' };
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(`Error al verificar el código: ${error.message}`);
        return { error: `Error al verificar el código: ${error.message}` };
      } else {
        this.logger.error('Error desconocido al verificar el código');
        return { error: 'Error desconocido al verificar el código' };
      }
    }
  }

  async sendVerificationTelefono(telefono: string): Promise<{ success?: string; error?: string }> {
    const telefonoConCodigoPais = '+593' + telefono;  // Asumiendo el código de país para Ecuador
    try {
      const verification = await this.twilioClient.verify.services(
        this.configService.get<string>('TWILIO_VERIFICATION_SID')
      ).verifications.create({ to: `whatsapp:${telefonoConCodigoPais}`, channel: 'sms' });

      if (verification.status === 'pending') {
        this.logger.log('Código de verificación enviado exitosamente por SMS');
        return { success: 'Código de verificación enviado exitosamente' };
      } else {
        this.logger.error('Error al enviar el código de verificación por SMS');
        return { error: 'Error al enviar el código de verificación' };
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(`Error al enviar el código de verificación por SMS: ${error.message}`);
        return { error: `Error al enviar el código de verificación: ${error.message}` };
      } else {
        this.logger.error('Error desconocido al enviar el código de verificación por SMS');
        return { error: 'Error desconocido al enviar el código de verificación' };
      }
    }
  }

  async verifyTelefonoCode(telefono: string, codigo: string): Promise<{ success?: string; error?: string }> {
    const telefonoConCodigoPais = '+593' + telefono; 
    try {
      const verificationCheck = await this.twilioClient.verify.services(
        this.configService.get<string>('TWILIO_VERIFICATION_SID')
      ).verificationChecks.create({ to: `${telefonoConCodigoPais}`, code: codigo });

      if (verificationCheck.status === 'approved') {
        this.logger.log('Código de verificación correcto');
        return { success: 'Código de verificación correcto' };
      } else {
        this.logger.error('Código de verificación incorrecto');
        return { error: 'Código de verificación incorrecto' };
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(`Error al verificar el código: ${error.message}`);
        return { error: `Error al verificar el código: ${error.message}` };
      } else {
        this.logger.error('Error desconocido al verificar el código');
        return { error: 'Error desconocido al verificar el código' };
      }
    }
  }
}
