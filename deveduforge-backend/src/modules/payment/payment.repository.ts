import { prisma } from '../../config/database/prisma';
import { Prisma } from '@prisma/client';

export class PaymentRepository {
  async findActivePlans() {
    return prisma.subscriptionPlan.findMany({ where: { isActive: true } });
  }

  async findPlanByCode(code: string) {
    return prisma.subscriptionPlan.findUnique({ where: { code } });
  }

  async findPlanById(id: string) {
    return prisma.subscriptionPlan.findUnique({ where: { id } });
  }

  async createPlan(data: Prisma.SubscriptionPlanCreateInput) {
    return prisma.subscriptionPlan.create({ data });
  }

  async updatePlan(id: string, data: Prisma.SubscriptionPlanUpdateInput) {
    return prisma.subscriptionPlan.update({ where: { id }, data });
  }

  async findUserSubscription(userId: string) {
    return prisma.userSubscription.findUnique({ where: { userId } });
  }

  async createUserSubscription(data: Prisma.UserSubscriptionCreateInput) {
    return prisma.userSubscription.create({ data });
  }

  async updateUserSubscription(id: string, data: Prisma.UserSubscriptionUpdateInput) {
    return prisma.userSubscription.update({ where: { id }, data });
  }

  async findPaymentById(id: string) {
    return prisma.payment.findUnique({ where: { id } });
  }

  async findPaymentByKey(idempotencyKey: string) {
    return prisma.payment.findUnique({ where: { idempotencyKey } });
  }

  async findPaymentByProviderId(providerPaymentId: string) {
    return prisma.payment.findFirst({ where: { providerPaymentId } });
  }

  async createPayment(data: Prisma.PaymentCreateInput) {
    return prisma.payment.create({ data });
  }

  async updatePaymentStatus(id: string, status: string, providerPaymentId?: string) {
    return prisma.payment.update({ where: { id }, data: { status: status as any, providerPaymentId } });
  }

  async createInvoice(data: Prisma.InvoiceCreateInput) {
    return prisma.invoice.create({ data });
  }

  async updateInvoicePdfUrl(id: string, pdfUrl: string) {
    return prisma.invoice.update({ where: { id }, data: { pdfUrl } });
  }

  async findInvoiceById(id: string) {
    return prisma.invoice.findUnique({
      where: { id },
      include: { payment: { include: { user: { select: { firstName: true, lastName: true, email: true } }, subscription: { include: { plan: true } } } } },
    });
  }

  async findInvoicesByUser(userId: string) {
    return prisma.invoice.findMany({
      where: { payment: { userId } },
      include: { payment: { select: { amountMad: true, currency: true, status: true, provider: true, createdAt: true } } },
      orderBy: { issuedAt: 'desc' },
    });
  }

  async findPaymentsByUser(userId: string) {
    return prisma.payment.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
  }
}
