import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { CitasService } from './citas.service';
import { CrearCitaDto } from './dto/crear-cita.dto';
import { ActualizarCitaDto } from './dto/actualizar-cita.dto';

@Controller('citas')
export class CitasController {
  constructor(private readonly service: CitasService) {}

  @Post() crear(@Body() dto: CrearCitaDto) { return this.service.crear(dto); }
  @Get() listar() { return this.service.listar(); }
  @Get(':id') obtener(@Param('id') id: string) { return this.service.obtener(id); }
  @Put(':id') reemplazar(@Param('id') id: string, @Body() dto: CrearCitaDto) { return this.service.actualizar(id, dto); }
  @Patch(':id') actualizar(@Param('id') id: string, @Body() dto: ActualizarCitaDto) { return this.service.actualizar(id, dto); }
  @Delete(':id') eliminar(@Param('id') id: string) { return this.service.eliminar(id); }
}
