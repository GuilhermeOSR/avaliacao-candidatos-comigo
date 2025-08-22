/*
  Warnings:

  - The `cargo` column on the `Colaborador` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."Colaborador" DROP COLUMN "cargo",
ADD COLUMN     "cargo" TEXT NOT NULL DEFAULT 'Atendente';

-- DropEnum
DROP TYPE "public"."Cargo";
