-- CreateEnum
CREATE TYPE "public"."Sexo" AS ENUM ('MASCULINO', 'FEMENINO');

-- CreateEnum
CREATE TYPE "public"."EstadoCita" AS ENUM ('PROGRAMADA', 'COMPLETADA', 'CANCELADA', 'AUSENTE');

-- CreateTable
CREATE TABLE "public"."pacientes" (
    "id" TEXT NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "fechaNacimiento" TIMESTAMP(3) NOT NULL,
    "sexo" "public"."Sexo" NOT NULL,
    "telefono" VARCHAR(30),
    "email" TEXT,
    "direccion" TEXT,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pacientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."medicos" (
    "id" TEXT NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "especialidad" TEXT NOT NULL,
    "numeroColegiado" TEXT NOT NULL,
    "telefono" VARCHAR(30),
    "email" TEXT,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "medicos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."citas" (
    "id" TEXT NOT NULL,
    "pacienteId" TEXT NOT NULL,
    "medicoId" TEXT NOT NULL,
    "programadaPara" TIMESTAMP(3) NOT NULL,
    "motivo" TEXT,
    "estado" "public"."EstadoCita" NOT NULL DEFAULT 'PROGRAMADA',
    "notas" TEXT,
    "creadaEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadaEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "citas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pacientes_email_key" ON "public"."pacientes"("email");

-- CreateIndex
CREATE INDEX "pacientes_apellidos_idx" ON "public"."pacientes"("apellidos");

-- CreateIndex
CREATE UNIQUE INDEX "medicos_numeroColegiado_key" ON "public"."medicos"("numeroColegiado");

-- CreateIndex
CREATE UNIQUE INDEX "medicos_email_key" ON "public"."medicos"("email");

-- CreateIndex
CREATE INDEX "medicos_apellidos_idx" ON "public"."medicos"("apellidos");

-- CreateIndex
CREATE INDEX "citas_pacienteId_idx" ON "public"."citas"("pacienteId");

-- CreateIndex
CREATE INDEX "citas_medicoId_idx" ON "public"."citas"("medicoId");

-- CreateIndex
CREATE INDEX "citas_programadaPara_idx" ON "public"."citas"("programadaPara");

-- AddForeignKey
ALTER TABLE "public"."citas" ADD CONSTRAINT "citas_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "public"."pacientes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."citas" ADD CONSTRAINT "citas_medicoId_fkey" FOREIGN KEY ("medicoId") REFERENCES "public"."medicos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
