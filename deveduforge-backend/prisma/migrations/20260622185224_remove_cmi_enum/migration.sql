-- Remove 'cmi' from PaymentProvider enum, keep 'stripe' and 'paypal'
ALTER TYPE "PaymentProvider" RENAME TO "PaymentProvider_old";
CREATE TYPE "PaymentProvider" AS ENUM ('stripe', 'paypal');
ALTER TABLE "Payment" ALTER COLUMN "provider" TYPE "PaymentProvider" USING ("provider"::text::"PaymentProvider");
ALTER TABLE "UserSubscription" ALTER COLUMN "paymentProvider" TYPE "PaymentProvider" USING ("paymentProvider"::text::"PaymentProvider");
DROP TYPE "PaymentProvider_old";
