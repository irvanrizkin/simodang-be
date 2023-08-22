-- CreateTable
CREATE TABLE `Metric` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `temperature` DECIMAL(10, 2) NOT NULL,
    `ph` DECIMAL(10, 2) NOT NULL,
    `tdo` DECIMAL(10, 2) NOT NULL,
    `tds` DECIMAL(10, 2) NOT NULL,
    `turbidity` DECIMAL(10, 2) NOT NULL,
    `pondId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Metric` ADD CONSTRAINT `Metric_pondId_fkey` FOREIGN KEY (`pondId`) REFERENCES `Pond`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
