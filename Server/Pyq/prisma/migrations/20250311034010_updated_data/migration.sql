/*
  Warnings:

  - The `solved` column on the `PYQ` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `raisedByUser_ID` to the `RaisedPyq` table without a default value. This is not possible if the table is not empty.
  - Added the required column `raisedByUser_NAME` to the `RaisedPyq` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SolvedType" AS ENUM ('NOTSOLVED', 'SOLVING', 'SOLVED');

-- DropForeignKey
ALTER TABLE "RaisedPyq" DROP CONSTRAINT "RaisedPyq_pyqId_fkey";

-- AlterTable
ALTER TABLE "PYQ" DROP COLUMN "solved",
ADD COLUMN     "solved" "SolvedType" NOT NULL DEFAULT 'NOTSOLVED';

-- AlterTable
ALTER TABLE "RaisedPyq" ADD COLUMN     "raisedByUser_ID" TEXT NOT NULL,
ADD COLUMN     "raisedByUser_NAME" TEXT NOT NULL,
ADD COLUMN     "solved" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Solution" (
    "id" TEXT NOT NULL,
    "pyqId" INTEGER NOT NULL,
    "solvedByUser_ID" TEXT NOT NULL,
    "solvedByUser_NAME" TEXT NOT NULL,
    "solutionText" TEXT,
    "solutionImage" TEXT,

    CONSTRAINT "Solution_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Solution_pyqId_key" ON "Solution"("pyqId");

-- AddForeignKey
ALTER TABLE "RaisedPyq" ADD CONSTRAINT "RaisedPyq_pyqId_fkey" FOREIGN KEY ("pyqId") REFERENCES "PYQ"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solution" ADD CONSTRAINT "Solution_pyqId_fkey" FOREIGN KEY ("pyqId") REFERENCES "PYQ"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
