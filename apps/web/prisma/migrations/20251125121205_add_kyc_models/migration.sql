-- CreateEnum
CREATE TYPE "KycStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'APPROVED', 'MANUAL_REVIEW', 'REJECTED');

-- CreateTable
CREATE TABLE "KycSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "KycStatus" NOT NULL DEFAULT 'PENDING',
    "level" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "meta" JSONB,

    CONSTRAINT "KycSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IdentityCheck" (
    "id" TEXT NOT NULL,
    "kycSessionId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "passed" BOOLEAN,
    "payload" JSONB,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IdentityCheck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AddressCheck" (
    "id" TEXT NOT NULL,
    "kycSessionId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "docType" TEXT NOT NULL,
    "passed" BOOLEAN,
    "payload" JSONB,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AddressCheck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IncomeCheck" (
    "id" TEXT NOT NULL,
    "kycSessionId" TEXT NOT NULL,
    "parserVersion" TEXT,
    "monthlySalary" INTEGER,
    "avgBalance" INTEGER,
    "incomeStability" DOUBLE PRECISION,
    "rentPowerScore" DOUBLE PRECISION,
    "evidence" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IncomeCheck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RiskFlag" (
    "id" TEXT NOT NULL,
    "kycSessionId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "severity" INTEGER NOT NULL,
    "message" TEXT,
    "payload" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RiskFlag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KycAttachment" (
    "id" TEXT NOT NULL,
    "kycSessionId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "KycAttachment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "IdentityCheck" ADD CONSTRAINT "IdentityCheck_kycSessionId_fkey" FOREIGN KEY ("kycSessionId") REFERENCES "KycSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AddressCheck" ADD CONSTRAINT "AddressCheck_kycSessionId_fkey" FOREIGN KEY ("kycSessionId") REFERENCES "KycSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncomeCheck" ADD CONSTRAINT "IncomeCheck_kycSessionId_fkey" FOREIGN KEY ("kycSessionId") REFERENCES "KycSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RiskFlag" ADD CONSTRAINT "RiskFlag_kycSessionId_fkey" FOREIGN KEY ("kycSessionId") REFERENCES "KycSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KycAttachment" ADD CONSTRAINT "KycAttachment_kycSessionId_fkey" FOREIGN KEY ("kycSessionId") REFERENCES "KycSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
