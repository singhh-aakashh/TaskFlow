/*
  Warnings:

  - The primary key for the `Edge` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `dbId` was added to the `Edge` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Edge" DROP CONSTRAINT "Edge_pkey",
ADD COLUMN     "dbId" TEXT NOT NULL,
ADD CONSTRAINT "Edge_pkey" PRIMARY KEY ("dbId");
