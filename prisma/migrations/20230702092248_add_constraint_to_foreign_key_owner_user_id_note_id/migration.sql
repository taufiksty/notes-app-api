/*
  Warnings:

  - You are about to alter the column `noteId` on the `Collaboration` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `userId` on the `Collaboration` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `owner` on the `Note` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.

*/
-- DropForeignKey
ALTER TABLE "Collaboration" DROP CONSTRAINT "Collaboration_noteId_fkey";

-- DropForeignKey
ALTER TABLE "Collaboration" DROP CONSTRAINT "Collaboration_userId_fkey";

-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_owner_fkey";

-- AlterTable
ALTER TABLE "Collaboration" ALTER COLUMN "noteId" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "userId" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "Note" ALTER COLUMN "owner" SET DATA TYPE VARCHAR(50);

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_owner_fkey" FOREIGN KEY ("owner") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collaboration" ADD CONSTRAINT "Collaboration_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collaboration" ADD CONSTRAINT "Collaboration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
