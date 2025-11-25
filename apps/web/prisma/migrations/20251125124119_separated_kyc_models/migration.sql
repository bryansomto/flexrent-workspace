/*
  Warnings:

  - You are about to drop the `AddressCheck` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `IdentityCheck` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `IncomeCheck` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `KycAttachment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `KycSession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RiskFlag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AddressCheck" DROP CONSTRAINT "AddressCheck_kycSessionId_fkey";

-- DropForeignKey
ALTER TABLE "IdentityCheck" DROP CONSTRAINT "IdentityCheck_kycSessionId_fkey";

-- DropForeignKey
ALTER TABLE "IncomeCheck" DROP CONSTRAINT "IncomeCheck_kycSessionId_fkey";

-- DropForeignKey
ALTER TABLE "KycAttachment" DROP CONSTRAINT "KycAttachment_kycSessionId_fkey";

-- DropForeignKey
ALTER TABLE "RiskFlag" DROP CONSTRAINT "RiskFlag_kycSessionId_fkey";

-- DropTable
DROP TABLE "AddressCheck";

-- DropTable
DROP TABLE "IdentityCheck";

-- DropTable
DROP TABLE "IncomeCheck";

-- DropTable
DROP TABLE "KycAttachment";

-- DropTable
DROP TABLE "KycSession";

-- DropTable
DROP TABLE "RiskFlag";

-- DropEnum
DROP TYPE "KycStatus";
