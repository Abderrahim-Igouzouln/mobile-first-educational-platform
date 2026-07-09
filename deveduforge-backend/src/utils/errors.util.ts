export class AppError extends Error {
  public readonly statusCode: number;

  public readonly code: string;

  public readonly details?: unknown;

  public readonly isOperational: boolean;

  constructor(statusCode: number, code: string, message: string, details?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.isOperational = true;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Ressource non trouvée', details?: unknown) {
    super(404, 'NOT_FOUND', message, details);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Accès refusé', details?: unknown) {
    super(403, 'FORBIDDEN', message, details);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Authentification requise', details?: unknown) {
    super(401, 'UNAUTHORIZED', message, details);
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Conflit', details?: unknown) {
    super(409, 'CONFLICT', message, details);
  }
}

export class ValidationError extends AppError {
  constructor(message = 'Données invalides', details?: unknown) {
    super(400, 'VALIDATION_FAILED', message, details);
  }
}

export class TooManyRequestsError extends AppError {
  constructor(message = 'Trop de requêtes', details?: unknown) {
    super(429, 'RATE_LIMIT_EXCEEDED', message, details);
  }
}
