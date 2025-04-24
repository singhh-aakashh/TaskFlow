/*
  Warnings:

  - The primary key for the `Node` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `dbId` to the `Node` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Action" DROP CONSTRAINT "Action_nodeId_fkey";

-- DropForeignKey
ALTER TABLE "Position" DROP CONSTRAINT "Position_nodeId_fkey";

-- DropForeignKey
ALTER TABLE "Trigger" DROP CONSTRAINT "Trigger_nodeId_fkey";

-- AlterTable
ALTER TABLE "Node" DROP CONSTRAINT "Node_pkey",
ADD COLUMN     "dbId" TEXT NOT NULL,
ADD CONSTRAINT "Node_pkey" PRIMARY KEY ("dbId");

-- AddForeignKey
ALTER TABLE "Trigger" ADD CONSTRAINT "Trigger_nodeId_fkey" FOREIGN KEY ("nodeId") REFERENCES "Node"("dbId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_nodeId_fkey" FOREIGN KEY ("nodeId") REFERENCES "Node"("dbId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_nodeId_fkey" FOREIGN KEY ("nodeId") REFERENCES "Node"("dbId") ON DELETE RESTRICT ON UPDATE CASCADE;
