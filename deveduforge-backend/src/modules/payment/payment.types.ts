export interface PaymentIntentResponse {
  clientSecret?: string;
  redirectUrl?: string;
  paymentId: string;
}

export interface PaymentResponse {
  id: string;
  amountMad: number;
  currency: string;
  status: string;
  provider: string;
  createdAt: string;
}
