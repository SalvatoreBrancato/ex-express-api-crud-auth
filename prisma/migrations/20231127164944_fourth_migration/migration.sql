-- AlterTable
ALTER TABLE `post_relazioni` ADD COLUMN `userId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `post_relazioni` ADD CONSTRAINT `post_relazioni_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
