import { Router } from 'express';
import * as instructorController from './instructor.controller';
import { extractUser } from '../auth/auth.middleware';
import { roleMiddleware } from '../../middleware/auth/role.middleware';
import { Role } from '../../constants/roles';

const router = Router();

router.get('/stats', extractUser, roleMiddleware(Role.INSTRUCTOR, Role.ADMIN, Role.SUPERADMIN), instructorController.getStats);
router.get('/courses', extractUser, roleMiddleware(Role.INSTRUCTOR, Role.ADMIN, Role.SUPERADMIN), instructorController.getCourses);

export default router;
