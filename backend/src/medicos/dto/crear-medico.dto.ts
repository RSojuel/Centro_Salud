import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class CrearMedicoDto {
  @ApiProperty() @IsString() @Length(1,100) nombres!: string;
  @ApiProperty() @IsString() @Length(1,100) apellidos!: string;
  @ApiProperty() @IsString() @Length(1,120) especialidad!: string;
  @ApiProperty() @IsString() @Length(3,50) numeroColegiado!: string;
  @ApiProperty({ required:false }) @IsOptional() @IsString() telefono?: string;
  @ApiProperty({ required:false }) @IsOptional() @IsEmail() email?: string;
}
