export const SubscriptionPlans = {
  FREE: {
    code: 'free',
    name: 'Gratuit',
    priceMad: 0,
    billingInterval: 'none',
    features: ['Accès catalogue public', '3 leçons par technologie', 'Exercices basiques'],
  },
  PREMIUM_MONTHLY: {
    code: 'premium_monthly',
    name: 'Premium Mensuel',
    priceMad: 50,
    billingInterval: 'monthly',
    features: ['Accès illimité à tous les cours', 'Exercices complets', 'Projets pratiques', 'Certificats vérifiables', 'Mode hors-ligne'],
  },
  PREMIUM_STUDENT: {
    code: 'premium_student',
    name: 'Premium Étudiant',
    priceMad: 35,
    billingInterval: 'monthly',
    features: ['Mêmes avantages que Premium', 'Vérification étudiante requise', 'Validité 12 mois max'],
  },
  PREMIUM_ANNUAL: {
    code: 'premium_annual',
    name: 'Premium Annuel',
    priceMad: 500,
    billingInterval: 'annual',
    features: ['Tous les avantages Premium', '2 mois offerts par rapport au mensuel', 'Badge Annuel exclusif'],
  },
} as const;
