/*
  Warnings:

  - You are about to drop the column `htmlBody` on the `EmailTemplate` table. All the data in the column will be lost.
  - Added the required column `emailTemplate` to the `EmailTemplate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EmailTemplate" DROP COLUMN "htmlBody",
ADD COLUMN     "emailTemplate" TEXT NOT NULL,
ADD COLUMN     "templateVariables" JSONB;
