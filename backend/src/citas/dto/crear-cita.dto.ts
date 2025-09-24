import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsString, Length } from 'class-validator';

export enum EstadoCita { PROGRAMADA='PROGRAMADA', COMPLETADA='COMPLETADA', CANCELADA='CANCELADA', AUSENTE='AUSENTE' }

export class CrearCitaDto {
  @ApiProperty() @IsString() @Length(1,50) pacienteId!: string;
  @ApiProperty() @IsString() @Length(1,50) medicoId!: string;
  @ApiProperty() @IsDateString() programadaPara!: string; // ISO
  @ApiProperty({ required:false }) @IsOptional() @IsString() motivo?: string;
  @ApiProperty({ enum: EstadoCita, required:false }) @IsOptional() @IsEnum(EstadoCita) estado?: EstadoCita;
  @ApiProperty({ required:false }) @IsOptional() @IsString() notas?: string;
}
