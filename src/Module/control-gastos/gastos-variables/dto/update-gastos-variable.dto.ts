import { PartialType } from '@nestjs/mapped-types';
import { CreateGastoVariableDto } from './create-gastos-variable.dto';


export class UpdateGastosVariableDto extends PartialType(CreateGastoVariableDto) {}
