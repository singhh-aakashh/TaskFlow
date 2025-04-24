/*
  Warnings:

  - You are about to drop the column `html` on the `EmailTemplate` table. All the data in the column will be lost.
  - Added the required column `htmlBody` to the `EmailTemplate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EmailTemplate" DROP COLUMN "html",
ADD COLUMN     "htmlBody" TEXT NOT NULL;
