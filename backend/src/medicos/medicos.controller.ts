import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { MedicosService } from './medicos.service';
import { CrearMedicoDto } from './dto/crear-medico.dto';
import { ActualizarMedicoDto } from './dto/actualizar-medico.dto';

@Controller('medicos')
export class MedicosController {
  constructor(private readonly service: MedicosService) {}

  @Post() crear(@Body() dto: CrearMedicoDto) { return this.service.crear(dto); }
  @Get() listar() { return this.service.listar(); }
  @Get(':id') obtener(@Param('id') id: string) { return this.service.obtener(id); }
  @Put(':id') reemplazar(@Param('id') id: string, @Body() dto: CrearMedicoDto) { return this.service.actualizar(id, dto); }
  @Patch(':id') actualizar(@Param('id') id: string, @Body() dto: ActualizarMedicoDto) { return this.service.actualizar(id, dto); }
  @Delete(':id') eliminar(@Param('id') id: string) { return this.service.eliminar(id); }
}
