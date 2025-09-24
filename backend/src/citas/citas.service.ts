import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CrearCitaDto } from './dto/crear-cita.dto';
import { ActualizarCitaDto } from './dto/actualizar-cita.dto';

@Injectable()
export class CitasService {
  constructor(private prisma: PrismaService) {}

  private async assertPacienteYMedico(pacienteId: string, medicoId: string) {
    const [p, m] = await Promise.all([
      this.prisma.paciente.findUnique({ where: { id: pacienteId } }),
      this.prisma.medico.findUnique({ where: { id: medicoId } }),
    ]);
    if (!p) throw new BadRequestException('Paciente no existe');
    if (!m) throw new BadRequestException('Médico no existe');
  }

  async crear(data: CrearCitaDto) {
    await this.assertPacienteYMedico(data.pacienteId, data.medicoId);
    return this.prisma.cita.create({
      data: { ...data, programadaPara: new Date(data.programadaPara) },
    });
  }

  listar() {
    return this.prisma.cita.findMany({
      orderBy: { programadaPara: 'asc' },
      include: { paciente: true, medico: true },
    });
  }

  async obtener(id: string) {
    const c = await this.prisma.cita.findUnique({ where: { id }, include: { paciente: true, medico: true } });
    if (!c) throw new NotFoundException('Cita no encontrada');
    return c;
  }

  async actualizar(id: string, data: ActualizarCitaDto) {
    await this.obtener(id);
    if (data.pacienteId || data.medicoId) {
      await this.assertPacienteYMedico(data.pacienteId ?? (await this.obtener(id)).pacienteId,
                                       data.medicoId   ?? (await this.obtener(id)).medicoId);
    }
    return this.prisma.cita.update({
      where: { id },
      data: {
        ...data,
        ...(data.programadaPara ? { programadaPara: new Date(data.programadaPara) } : {}),
      },
      include: { paciente: true, medico: true },
    });
  }

  async eliminar(id: string) {
    await this.obtener(id);
    await this.prisma.cita.delete({ where: { id } });
    return { eliminado: true };
  }
}
