import { Router } from 'express';
import authRoutes from './auth/auth.routes';
import userRoutes from './user/user.routes';
import courseRoutes from './course/course.routes';
import exerciseRoutes from './exercise/exercise.routes';
import projectRoutes from './project/project.routes';
import certificationRoutes from './certification/certification.routes';
import paymentRoutes from './payment/payment.routes';
import progressRoutes from './progress/progress.routes';
import notificationRoutes from './notification/notification.routes';
import analyticsRoutes from './analytics/analytics.routes';
import communityRoutes from './community/community.routes';
import adminRoutes from './admin/admin.routes';
import auditRoutes from './audit/audit.routes';
import offlineRoutes from './offline/offline.routes';
import instructorRoutes from './instructor/instructor.routes';
import uploadRoutes from './upload/upload.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/courses', courseRoutes);
router.use('/exercises', exerciseRoutes);
router.use('/projects', projectRoutes);
router.use('/certifications', certificationRoutes);
router.use('/payments', paymentRoutes);
router.use('/progress', progressRoutes);
router.use('/notifications', notificationRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/community', communityRoutes);
router.use('/admin', adminRoutes);
router.use('/audit', auditRoutes);
router.use('/offline', offlineRoutes);
router.use('/instructor', instructorRoutes);
router.use('/upload', uploadRoutes);

export { router as routes };
