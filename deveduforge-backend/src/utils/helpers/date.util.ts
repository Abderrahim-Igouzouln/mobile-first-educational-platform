export function now(): Date {
  return new Date();
}

export function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60000);
}

export function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * 86400000);
}

export function isExpired(date: Date): boolean {
  return new Date() > date;
}

export function formatDate(date: Date): string {
  return date.toISOString();
}
