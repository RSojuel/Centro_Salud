import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CrearMedicoDto } from './dto/crear-medico.dto';
import { ActualizarMedicoDto } from './dto/actualizar-medico.dto';

@Injectable()
export class MedicosService {
  constructor(private prisma: PrismaService) {}

  crear(data: CrearMedicoDto) {
    return this.prisma.medico.create({ data });
  }

  listar() {
    return this.prisma.medico.findMany({ orderBy: { creadoEn: 'desc' } });
  }

  async obtener(id: string) {
    const m = await this.prisma.medico.findUnique({ where: { id } });
    if (!m) throw new NotFoundException('Médico no encontrado');
    return m;
  }

  async actualizar(id: string, data: ActualizarMedicoDto) {
    await this.obtener(id);
    return this.prisma.medico.update({ where: { id }, data });
  }

  async eliminar(id: string) {
    await this.obtener(id);
    await this.prisma.medico.delete({ where: { id } });
    return { eliminado: true };
  }
}
