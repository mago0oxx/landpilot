-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "inPortfolio" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "portfolioAddedAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "Property_userId_inPortfolio_idx" ON "Property"("userId", "inPortfolio");
