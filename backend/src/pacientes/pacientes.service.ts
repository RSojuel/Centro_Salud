import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CrearPacienteDto } from './dto/crear-paciente.dto';
import { ActualizarPacienteDto } from './dto/actualizar-paciente.dto';

@Injectable()
export class PacientesService {
  constructor(private prisma: PrismaService) {}

  crear(data: CrearPacienteDto) {
    return this.prisma.paciente.create({
      data: { ...data, fechaNacimiento: new Date(data.fechaNacimiento) },
    });
  }

  listar() {
    return this.prisma.paciente.findMany({ orderBy: { creadoEn: 'desc' } });
  }

  async obtener(id: string) {
    const paciente = await this.prisma.paciente.findUnique({ where: { id } });
    if (!paciente) throw new NotFoundException('Paciente no encontrado');
    return paciente;
    }

  async actualizar(id: string, data: ActualizarPacienteDto) {
    await this.obtener(id);
    return this.prisma.paciente.update({
      where: { id },
      data: { ...data, ...(data.fechaNacimiento ? { fechaNacimiento: new Date(data.fechaNacimiento) } : {}) },
    });
  }

  async eliminar(id: string) {
    await this.obtener(id);
    await this.prisma.paciente.delete({ where: { id } });
    return { eliminado: true };
  }
}
