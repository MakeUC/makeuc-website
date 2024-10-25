-- DropForeignKey
ALTER TABLE "PassportStrategyStorage" DROP CONSTRAINT "PassportStrategyStorage_user_fkey";

-- AddForeignKey
ALTER TABLE "PassportStrategyStorage" ADD CONSTRAINT "PassportStrategyStorage_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
