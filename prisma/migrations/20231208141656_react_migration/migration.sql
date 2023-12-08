-- DropForeignKey
ALTER TABLE `post_relazioni` DROP FOREIGN KEY `post_relazioni_categoryId_fkey`;

-- AlterTable
ALTER TABLE `post_relazioni` MODIFY `published` BOOLEAN NULL DEFAULT false,
    MODIFY `categoryId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `post_relazioni` ADD CONSTRAINT `post_relazioni_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
