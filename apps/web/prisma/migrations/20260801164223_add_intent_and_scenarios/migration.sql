-- AlterTable
ALTER TABLE "LandAnalysis" ADD COLUMN     "intent" TEXT NOT NULL DEFAULT 'investment',
ADD COLUMN     "scenarios" JSONB;
