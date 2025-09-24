import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { PacientesService } from './pacientes.service';
import { CrearPacienteDto } from './dto/crear-paciente.dto';
import { ActualizarPacienteDto } from './dto/actualizar-paciente.dto';

@Controller('pacientes')
export class PacientesController {
  constructor(private readonly service: PacientesService) {}

  @Post() crear(@Body() dto: CrearPacienteDto) { return this.service.crear(dto); }
  @Get() listar() { return this.service.listar(); }
  @Get(':id') obtener(@Param('id') id: string) { return this.service.obtener(id); }
  @Put(':id') reemplazar(@Param('id') id: string, @Body() dto: CrearPacienteDto) { return this.service.actualizar(id, dto); }
  @Patch(':id') actualizar(@Param('id') id: string, @Body() dto: ActualizarPacienteDto) { return this.service.actualizar(id, dto); }
  @Delete(':id') eliminar(@Param('id') id: string) { return this.service.eliminar(id); }
}
