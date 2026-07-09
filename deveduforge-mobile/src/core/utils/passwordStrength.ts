export function checkPasswordStrength(password: string): { score: number; label: string } {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const labels = ['Très faible', 'Faible', 'Moyen', 'Fort', 'Très fort'];
  const index = Math.min(Math.max(score - 1, 0), 4);

  return { score, label: labels[index] };
}
