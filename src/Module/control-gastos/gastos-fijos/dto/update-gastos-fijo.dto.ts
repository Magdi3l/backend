import { PartialType } from '@nestjs/mapped-types';
import { CreateGastoFijoDto } from './create-gastos-fijo.dto';

export class UpdateGastosFijoDto extends PartialType(CreateGastoFijoDto) {}
