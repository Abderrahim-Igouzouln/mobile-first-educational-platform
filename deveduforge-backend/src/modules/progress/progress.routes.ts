/**
 * @openapi
 * /progress/dashboard:
 *   get:
 *     tags: [Progression]
 *     summary: Tableau de bord (stats, streak, achievements, activité)
 *     security: [{ bearerAuth: [] }]
 *     responses: { 200: { description: Dashboard complet } }
 *
 * /progress/achievements:
 *   get:
 *     tags: [Progression]
 *     summary: Mes achievements
 *     security: [{ bearerAuth: [] }]
 *     responses: { 200: { description: Achievements débloqués } }
 *
 * /progress/activity-calendar:
 *   get:
 *     tags: [Progression]
 *     summary: Calendrier d'activité (30 jours)
 *     security: [{ bearerAuth: [] }]
 *     responses: { 200: { description: "Calendrier (date -> count)" } }
 *
 * /progress/streak:
 *   get:
 *     tags: [Progression]
 *     summary: Ma série actuelle
 *     security: [{ bearerAuth: [] }]
 *     responses: { 200: { description: Streak } }
 */
import { Router } from 'express';
import * as progressController from './progress.controller';
import { extractUser } from '../auth/auth.middleware';

const router = Router();

router.get('/dashboard', extractUser, progressController.getDashboard);
router.get('/achievements', extractUser, progressController.getAchievements);
router.get('/activity-calendar', extractUser, progressController.getActivityCalendar);
router.get('/streak', extractUser, progressController.getStreak);
router.get('/time-series', extractUser, progressController.getTimeSeries);
router.get('/domain-breakdown', extractUser, progressController.getDomainBreakdown);
router.get('/platform-compare', extractUser, progressController.getPlatformComparison);

export default router;
