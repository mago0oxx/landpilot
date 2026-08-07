-- CreateTable
CREATE TABLE "Property" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "county" TEXT NOT NULL,
    "state" TEXT NOT NULL DEFAULT 'FL',
    "parcelId" TEXT,
    "listingUrl" TEXT,
    "lotSizeSqft" DOUBLE PRECISION NOT NULL,
    "askingPrice" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LandAnalysis" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "inputs" JSONB NOT NULL,
    "lpsScore" DOUBLE PRECISION NOT NULL,
    "estimatedRoi" DOUBLE PRECISION NOT NULL,
    "confidenceLevel" TEXT NOT NULL,
    "riskLevel" TEXT NOT NULL,
    "recommendation" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "engineResults" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LandAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LandAnalysis_propertyId_idx" ON "LandAnalysis"("propertyId");

-- CreateIndex
CREATE INDEX "LandAnalysis_createdAt_idx" ON "LandAnalysis"("createdAt");

-- AddForeignKey
ALTER TABLE "LandAnalysis" ADD CONSTRAINT "LandAnalysis_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
