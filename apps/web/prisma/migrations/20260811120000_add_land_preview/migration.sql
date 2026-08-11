-- CreateTable
CREATE TABLE "LandPreview" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "county" TEXT,
    "state" TEXT,
    "lookup" JSONB NOT NULL,
    "addressKey" TEXT NOT NULL,
    "ipHash" TEXT,
    "claimedByUserId" TEXT,
    "claimedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LandPreview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LandPreview_addressKey_createdAt_idx" ON "LandPreview"("addressKey", "createdAt");

-- CreateIndex
CREATE INDEX "LandPreview_ipHash_createdAt_idx" ON "LandPreview"("ipHash", "createdAt");
