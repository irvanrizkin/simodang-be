/*
  Warnings:

  - Made the column `profilePic` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `token` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `profilePic` VARCHAR(191) NOT NULL DEFAULT 'https://placehold.co/500x500.png',
    MODIFY `token` VARCHAR(191) NOT NULL DEFAULT '';
