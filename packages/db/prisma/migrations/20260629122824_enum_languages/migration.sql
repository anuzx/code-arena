/*
  Warnings:

  - Changed the type of `language` on the `submissions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Languages" AS ENUM ('cpp', 'js', 'python');

-- AlterTable
ALTER TABLE "submissions" DROP COLUMN "language",
ADD COLUMN     "language" "Languages" NOT NULL;
