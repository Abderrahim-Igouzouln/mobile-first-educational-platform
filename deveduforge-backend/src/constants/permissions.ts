import { Role } from './roles';

export const permissions = {
  'course:create': [Role.INSTRUCTOR, Role.ADMIN, Role.SUPERADMIN],
  'course:edit': [Role.INSTRUCTOR, Role.ADMIN, Role.SUPERADMIN],
  'course:delete': [Role.ADMIN, Role.SUPERADMIN],
  'course:publish': [Role.INSTRUCTOR, Role.ADMIN, Role.SUPERADMIN],
  'exercise:create': [Role.INSTRUCTOR, Role.ADMIN, Role.SUPERADMIN],
  'exercise:edit': [Role.INSTRUCTOR, Role.ADMIN, Role.SUPERADMIN],
  'project:review': [Role.INSTRUCTOR, Role.MODERATOR, Role.ADMIN, Role.SUPERADMIN],
  'community:moderate': [Role.MODERATOR, Role.ADMIN, Role.SUPERADMIN],
  'user:manage': [Role.ADMIN, Role.SUPERADMIN],
  'user:ban': [Role.ADMIN, Role.SUPERADMIN],
  'user:promote': [Role.SUPERADMIN],
  'certificate:revoke': [Role.ADMIN, Role.SUPERADMIN],
  'system:configure': [Role.SUPERADMIN],
  'audit:view': [Role.ADMIN, Role.SUPERADMIN],
} as const;
