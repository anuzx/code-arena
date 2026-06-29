-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('pending', 'failed', 'success');

-- CreateTable
CREATE TABLE "submissions" (
    "id" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "status" "SubmissionStatus" NOT NULL,
    "output" TEXT,
    "Error" TEXT,

    CONSTRAINT "submissions_pkey" PRIMARY KEY ("id")
);
