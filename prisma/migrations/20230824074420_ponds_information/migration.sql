/*
  Warnings:

  - You are about to alter the column `phHigh` on the `pond` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `phLow` on the `pond` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `turbiditiesHigh` on the `pond` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `turbiditiesLow` on the `pond` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - Added the required column `name` to the `Pond` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pond` ADD COLUMN `imageUrl` VARCHAR(191) NOT NULL DEFAULT 'https://placehold.co/1280x720.png',
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    MODIFY `phHigh` DECIMAL(10, 2) NOT NULL DEFAULT 9,
    MODIFY `phLow` DECIMAL(10, 2) NOT NULL DEFAULT 6.5,
    MODIFY `turbiditiesHigh` DECIMAL(10, 2) NOT NULL DEFAULT 0.25,
    MODIFY `turbiditiesLow` DECIMAL(10, 2) NOT NULL DEFAULT 0.1;
