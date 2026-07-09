import { Role } from '../constants/roles';

declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
      role: Role;
      locale: string;
      emailVerifiedAt: Date | null;
    }

    interface Request {
      user?: User;
      requestId?: string;
    }
  }
}

export {};
