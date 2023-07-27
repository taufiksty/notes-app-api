/*
  Warnings:

  - Changed the type of `tags` on the `Note` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Note" DROP COLUMN "tags",
ADD COLUMN     "tags" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" SET DATA TYPE TEXT;
