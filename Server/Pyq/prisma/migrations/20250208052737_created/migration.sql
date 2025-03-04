-- CreateEnum
CREATE TYPE "ExamType" AS ENUM ('PYQ', 'MidSem');

-- CreateEnum
CREATE TYPE "Branch" AS ENUM ('ECE', 'EX', 'CSE', 'ME', 'AU', 'PCT', 'IT');

-- CreateTable
CREATE TABLE "PYQ" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "unit" INTEGER NOT NULL,
    "examType" "ExamType" NOT NULL,
    "examYear" TEXT,
    "midSemNumber" INTEGER,
    "subjectCode" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "image" TEXT,
    "repeated" INTEGER NOT NULL DEFAULT 0,
    "marks" INTEGER NOT NULL,
    "collegeYear" INTEGER NOT NULL,
    "branch" "Branch",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PYQ_pkey" PRIMARY KEY ("id")
);
