import { PartialType } from '@nestjs/swagger';
import { CrearMedicoDto } from './crear-medico.dto';

export class ActualizarMedicoDto extends PartialType(CrearMedicoDto) {}
