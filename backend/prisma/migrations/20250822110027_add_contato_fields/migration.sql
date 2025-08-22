-- AlterTable
ALTER TABLE "public"."Ticket" ADD COLUMN     "contatoPassivo" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "tipoContato" TEXT;
