/*
  Warnings:

  - A unique constraint covering the columns `[userId,title]` on the table `credential` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."credential_title_userId_key";

-- CreateTable
CREATE TABLE "public"."safenotes" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "text" VARCHAR(1000) NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "safenotes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "safenotes_userId_title_key" ON "public"."safenotes"("userId", "title");

-- CreateIndex
CREATE UNIQUE INDEX "credential_userId_title_key" ON "public"."credential"("userId", "title");

-- AddForeignKey
ALTER TABLE "public"."safenotes" ADD CONSTRAINT "safenotes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
