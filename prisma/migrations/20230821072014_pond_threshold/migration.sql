/*
  Warnings:

  - You are about to drop the column `fcrLower` on the `pond` table. All the data in the column will be lost.
  - You are about to drop the column `fcrUpper` on the `pond` table. All the data in the column will be lost.
  - You are about to drop the column `hmdLower` on the `pond` table. All the data in the column will be lost.
  - You are about to drop the column `hmdUpper` on the `pond` table. All the data in the column will be lost.
  - You are about to drop the column `phLower` on the `pond` table. All the data in the column will be lost.
  - You are about to drop the column `phUpper` on the `pond` table. All the data in the column will be lost.
  - You are about to drop the column `salLower` on the `pond` table. All the data in the column will be lost.
  - You are about to drop the column `salUpper` on the `pond` table. All the data in the column will be lost.
  - You are about to drop the column `tdoLower` on the `pond` table. All the data in the column will be lost.
  - You are about to drop the column `tdoUpper` on the `pond` table. All the data in the column will be lost.
  - You are about to drop the column `tempLower` on the `pond` table. All the data in the column will be lost.
  - You are about to drop the column `tempUpper` on the `pond` table. All the data in the column will be lost.
  - Made the column `seedDate` on table `pond` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `pond` DROP COLUMN `fcrLower`,
    DROP COLUMN `fcrUpper`,
    DROP COLUMN `hmdLower`,
    DROP COLUMN `hmdUpper`,
    DROP COLUMN `phLower`,
    DROP COLUMN `phUpper`,
    DROP COLUMN `salLower`,
    DROP COLUMN `salUpper`,
    DROP COLUMN `tdoLower`,
    DROP COLUMN `tdoUpper`,
    DROP COLUMN `tempLower`,
    DROP COLUMN `tempUpper`,
    ADD COLUMN `phHigh` DECIMAL(65, 30) NOT NULL DEFAULT 9,
    ADD COLUMN `phLow` DECIMAL(65, 30) NOT NULL DEFAULT 6.5,
    ADD COLUMN `tdoHigh` INTEGER NOT NULL DEFAULT 8,
    ADD COLUMN `tdoLow` INTEGER NOT NULL DEFAULT 4,
    ADD COLUMN `tdsHigh` INTEGER NOT NULL DEFAULT 1200,
    ADD COLUMN `tdsLow` INTEGER NOT NULL DEFAULT 1000,
    ADD COLUMN `tempHigh` INTEGER NOT NULL DEFAULT 30,
    ADD COLUMN `tempLow` INTEGER NOT NULL DEFAULT 28,
    ADD COLUMN `turbiditiesHigh` DECIMAL(65, 30) NOT NULL DEFAULT 0.25,
    ADD COLUMN `turbiditiesLow` DECIMAL(65, 30) NOT NULL DEFAULT 0.1,
    MODIFY `seedDate` DATETIME(3) NOT NULL,
    MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'green';
