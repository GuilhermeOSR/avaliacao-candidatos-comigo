/*
  Warnings:

  - You are about to drop the column `colaboradorId` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the `Colaborador` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Ticket" DROP CONSTRAINT "Ticket_colaboradorId_fkey";

-- AlterTable
ALTER TABLE "public"."Ticket" DROP COLUMN "colaboradorId",
ADD COLUMN     "usuarioId" INTEGER;

-- DropTable
DROP TABLE "public"."Colaborador";

-- CreateTable
CREATE TABLE "public"."Usuario" (
    "id" SERIAL NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cargo" TEXT NOT NULL DEFAULT 'Atendente',

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_login_key" ON "public"."Usuario"("login");

-- AddForeignKey
ALTER TABLE "public"."Ticket" ADD CONSTRAINT "Ticket_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
