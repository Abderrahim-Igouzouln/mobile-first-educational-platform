-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('subscription', 'certificate');

-- CreateEnum
CREATE TYPE "CertificateStatus" AS ENUM ('locked', 'unlocked', 'paid');

-- AlterTable: Add certificate fields to Certificate
ALTER TABLE "Certificate" 
  ADD COLUMN "courseId" UUID NOT NULL,
  ADD COLUMN "status" "CertificateStatus" NOT NULL DEFAULT 'locked',
  ADD COLUMN "priceMad" DECIMAL(10,2) NOT NULL DEFAULT 29.00,
  ADD COLUMN "unlockedAt" TIMESTAMPTZ,
  ADD COLUMN "paidAt" TIMESTAMPTZ,
  ADD COLUMN "paymentId" UUID UNIQUE;

-- AlterTable: Add type to Payment
ALTER TABLE "Payment"
  ADD COLUMN "type" "PaymentType" NOT NULL DEFAULT 'subscription';

-- CreateIndex
CREATE UNIQUE INDEX "Certificate_userId_courseId_key" ON "Certificate"("userId", "courseId");

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_courseId_fkey" 
  FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_paymentId_fkey" 
  FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
