import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsEnum, IsOptional, IsString, Length } from 'class-validator';

export enum Sexo { MASCULINO='MASCULINO', FEMENINO='FEMENINO' }

export class CrearPacienteDto {
  @ApiProperty() @IsString() @Length(1,100) nombres!: string;
  @ApiProperty() @IsString() @Length(1,100) apellidos!: string;
  @ApiProperty() @IsDateString() fechaNacimiento!: string; // ISO: 1990-04-10
  @ApiProperty({ enum: Sexo }) @IsEnum(Sexo) sexo!: Sexo;
  @ApiProperty({ required:false }) @IsOptional() @IsString() telefono?: string;
  @ApiProperty({ required:false }) @IsOptional() @IsEmail() email?: string;
  @ApiProperty({ required:false }) @IsOptional() @IsString() direccion?: string;
}
