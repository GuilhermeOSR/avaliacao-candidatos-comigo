-- CreateEnum
CREATE TYPE "public"."Cargo" AS ENUM ('Admin', 'Atendente');

-- AlterTable
ALTER TABLE "public"."Colaborador" ADD COLUMN     "cargo" "public"."Cargo" NOT NULL DEFAULT 'Atendente';
