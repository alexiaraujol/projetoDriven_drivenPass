/*
  Warnings:

  - A unique constraint covering the columns `[title,userId]` on the table `credential` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `credential` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."credential" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "credential_title_userId_key" ON "public"."credential"("title", "userId");

-- AddForeignKey
ALTER TABLE "public"."credential" ADD CONSTRAINT "credential_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
