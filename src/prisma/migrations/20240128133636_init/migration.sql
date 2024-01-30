/*
  Warnings:

  - A unique constraint covering the columns `[shortId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `User_shortId_key` ON `User`(`shortId`);
