# DevEduForge — Project Architecture & Status Report

> **Generated:** 30/07/2026  
> **Scope:** `deveduforge-backend` + `deveduforge-mobile`  
> **Author:** Staff Engineer Scan

---

## 1. Executive Overview & Tech Stack

**DevEduForge** is a mobile-first educational platform for developers, offering structured learning paths (Domains → Technologies → Courses → Lessons), interactive exercises, certifications, project-based learning, community features, and a multi-tier subscription model (Free → Premium → Premium+).

### Frontend (`deveduforge-mobile` / Expo SDK ~56)

| Package | Version |
|---|---|
| **Expo** | `~56.0.15` |
| **React Native** | `0.85.3` |
| **React** | `19.2.3` |
| **React Navigation** (native-stack + bottom-tabs) | `^7.17.5` / `^7.18.2` |
| **Redux Toolkit** | `^2.12.0` |
| **React Query (TanStack)** | `^5.101.0` |
| **Axios** | `^1.18.0` |
| **React Hook Form** | `^7.80.0` |
| **Zod** (validation) | `^4.4.3` |
| **i18next / react-i18next** | `^26.3.1` / `^17.0.8` |
| **lucide-react-native** (icons) | `^1.21.0` |
| **expo-secure-store** (token storage) | `^56.0.4` |
| **expo-video** | `~56.1.4` |
| **react-native-reanimated** | `4.3.1` |
| **react-native-gesture-handler** | `~2.31.1` |
| **react-native-toast-message** | `^2.3.3` |
| **expo-linear-gradient** | `^56.0.4` |

### Backend (`deveduforge-backend` / Node.js + Express + Prisma)

| Package | Version |
|---|---|
| **Express** | `^4.22.2` |
| **Prisma** (ORM) | `^5.14.0` |
| **Zod** (validation, backend) | `^3.23.8` |
| **Stripe** | `^15.8.0` |
| **BullMQ** (background jobs) | `^5.8.0` |
| **ioredis** | `^5.4.1` |
| **Passport** (JWT + local strategies) | `^0.7.0` |
| **bcrypt** | `^5.1.1` |
| **Winston** (logging) | `^3.13.0` |
| **Swagger** (API docs) | `swagger-jsdoc` + `swagger-ui-express` |
| **Nodemailer** | `^6.9.13` |
| **PostgreSQL** (via docker-compose) + Supabase cloud |

### Infrastructure

- **Database:** PostgreSQL 16 (Alpine via Docker) — remote Supabase (`qlxervymiozhcfjptads`, eu-west-1)
- **Cache/Queue:** Redis 7 (Alpine via Docker)
- **Containerization:** Docker + docker-compose (dev + prod + test profiles)
- **CI:** GitHub Actions (`.github/workflows/`)
- **Reverse Proxy:** Nginx (production)

---

## 2. Authentication & Role-Based Access Control (RBAC)

### User Roles (from `prisma/schema.prisma`)

| Role | Hierarchy Level | Description |
|---|---|---|
| `guest` | 0 | Unauthenticated visitors |
| `student` | 1 | Default role on registration |
| `instructor` | 2 | Can create/edit courses & exercises |
| `moderator` | 3 | Can moderate community content |
| `admin` | 4 | Full administrative access |
| `superadmin` | 5 | System configuration, promotions |

Permissions are defined in `src/constants/permissions.ts` with a fine-grained string-based permission system (e.g., `course:create`, `user:promote`, `audit:view`).

### Auth Flow (Backend)

- **JWT dual-token** system (access token: 15 min, refresh token: 30 days)
- Access token signed with `sub`, `email`, `role`, `locale`, `emailVerifiedAt` claims
- **`authMiddleware`** (`src/middleware/auth.middleware.ts`): Verifies Bearer token via `verifyAccessToken`, fetches user from DB, sets `req.user`
- **`optionalAuth`** (`src/middleware/optionalAuth.middleware.ts`): Same but doesn't throw on missing token — used for public routes that optionally enrich data
- **`roleMiddleware`** (`src/middleware/role.middleware.ts`): Hierarchy-based check — user's role level must be >= minimum required level
- Account lockout after 5 failed login attempts (15 min lock)
- Email verification flow (token-based, 24h expiry)
- Forgot/reset password flow (token-based, 1h expiry)
- Full audit logging for auth events (register, login, email verify, password change)
- Refresh token rotation with revocation on reuse detection

### Auth Flow (Frontend)

- **`AuthProvider`** (React Context) wraps the app in `App.tsx`
- On mount, restores tokens from `expo-secure-store`, validates session via `GET /auth/me`
- **Axios interceptor** (`authInterceptor.ts`):
  - Attaches `Bearer` token on every request
  - On 401, attempts refresh via `POST /auth/refresh` with queue for concurrent requests
  - On refresh failure, clears tokens and resets auth state
- **`RootNavigator`** switches between `AuthNavigator` (unauthenticated) and `MainNavigator` (authenticated) based on `isAuthenticated` state
- Redux `auth.slice` mirrors auth state for cross-component access

### Auth Screens (Frontend)

| Screen | Route |
|---|---|
| Onboarding | `Onboarding` |
| Login | `Login` |
| Register | `Register` |
| Forgot Password | `ForgotPassword` |
| Reset Password | `ResetPassword` |
| Verify Email | `VerifyEmail` |
| Biometric Setup | `BiometricSetup` |

---

## 3. Frontend Architecture & Navigation Tree

### App Entry (`App.tsx`)

```
GestureHandlerRootView
 └─ ReduxProvider (store)
     └─ QueryClientProvider (react-query)
         └─ SafeAreaProvider
             └─ AuthProvider
                 └─ NavigationContainer (linking + ref)
                     └─ RootNavigator
                         ├─ Auth (AuthNavigator — stack)
                         │   ├─ Onboarding
                         │   ├─ Login
                         │   ├─ Register
                         │   ├─ ForgotPassword
                         │   ├─ ResetPassword
                         │   ├─ VerifyEmail
                         │   └─ BiometricSetup
                         └─ Main (MainNavigator — bottom tabs)
                             ├─ HomeTab (HomeNavigator — stack)
                             │   ├─ HomeScreen
                             │   ├─ DashboardScreen
                             │   ├─ SearchScreen
                             │   └─ RoadmapScreen
                             ├─ CoursesTab (CourseNavigator — stack)
                             │   ├─ DomainsScreen
                             │   ├─ TechnologiesScreen
                             │   ├─ CourseScreen
                             │   ├─ LessonScreen
                             │   ├─ LectureScreen
                             │   ├─ VideoPlayerScreen
                             │   ├─ OfflineCoursesScreen
                             │   ├─ ProjectsScreen
                             │   ├─ ProjectDetailScreen
                             │   ├─ ProjectSubmissionScreen
                             │   └─ ProjectReviewScreen
                             ├─ ExercisesTab (ExerciseNavigator — stack)
                             │   ├─ ExercisesScreen
                             │   ├─ QuizScreen
                             │   ├─ ExerciseResultScreen
                             │   ├─ ExerciseReviewScreen
                             │   └─ ExerciseHistoryScreen
                             ├─ CertificationsTab (CertificationNavigator — stack)
                             │   ├─ CertificationsListScreen
                             │   ├─ CertificationDetailScreen
                             │   ├─ ExamScreen
                             │   ├─ CertificationResultScreen
                             │   └─ CertificateViewScreen
                             ├─ CommunityTab (CommunityNavigator — stack)
                             │   ├─ CommunityScreen
                             │   ├─ DiscussionScreen
                             │   ├─ NewPostScreen
                             │   ├─ MentorshipScreen
                             │   ├─ StudyGroupsScreen
                             │   ├─ StudyGroupDetailScreen
                             │   └─ MentorProfileScreen
                             └─ ProfileTab (ProfileNavigator — stack)
                                 ├─ ProfileScreen
                                 ├─ EditProfileScreen
                                 ├─ SettingsScreen
                                 ├─ InstructorDashboardScreen
                                 ├─ NotificationCenterScreen
                                 ├─ LanguageScreen
                                 ├─ SecurityScreen
                                 ├─ NotificationSettingsScreen
                                 ├─ DataSettingsScreen
                                 ├─ AboutScreen
                                 ├─ SubscriptionScreen
                                 ├─ PaymentScreen
                                 └─ PaymentSuccessScreen
```

### State Management Architecture

```
Redux Store (configured in lib/redux/store.ts)
 ├─ auth.slice        — user session, biometric status
 ├─ course.slice      — course/lesson data (local cache)
 ├─ exercise.slice    — exercise state
 ├─ certification.slice — certifications/ongoing exams
 ├─ offline.slice     — sync queue, online/offline status
 └─ ui.slice          — theme, modals, toasts

React Query (TanStack) — server state cache
 ├─ queryKeys.courses     — domains, technologies, course detail, bookmarks
 ├─ queryKeys.user        — profile, subscription, stats
 ├─ queryKeys.exercises   — exercise list, detail
 ├─ queryKeys.certifications — cert list, detail
 ├─ queryKeys.projects    — project list, detail, my submissions
 ├─ queryKeys.notifications — notification list
 └─ queryKeys.community   — discussions, study groups
```

### Shared UI Component Library

All in `src/shared/components/`:

- **Layout:** `ScreenWrapper`, `Container`, `BottomTabBar`
- **Forms:** `FormInput`, `FormSelect`, `FormValidation`
- **UI:** `Button`, `Card`, `Input`, `Badge`, `Chip`, `Avatar`, `Modal`, `Toast`, `LoadingSpinner`, `SkeletonLoader`, `EmptyState`, `ErrorBoundary`, `NetworkStatusBanner`, `OfflineIndicator`, `ActivityHeatmap`

---

## 4. Backend & Database Schema Summary

### Core Data Model Relationships (from `prisma/schema.prisma`)

```
Domain (slug, name, icon, colorTheme, order)
 └─ Technology (slug, name, icon, isPremiumOnly, order)
     ├─ Course (title, description, level, estimatedDurationMin, isPublished)
     │   └─ author → User (via "CourseAuthor")
     │   ├─ Lesson (title, contentMarkdown, order, durationMin, videoUrl, isPublished)
     │   │   ├─ UserProgress (status: not_started/in_progress/completed)
     │   │   ├─ Bookmark (per user)
     │   │   └─ Exercise (title, passingScorePercent)
     │   │       └─ Question (type: mcq/true_false/fill_blank, prompt, explanation, points)
     │   │           └─ AnswerOption (label, isCorrect, order)
     │   │       └─ ExerciseResult (scorePercent, passed, attemptNumber)
     │   │           └─ UserAnswer (selectedOptionId, textAnswer, isCorrect)
     │   └─ Project (title, instructions, evaluationCriteria)
     │       └─ ProjectSubmission (status, repositoryUrl, fileUrl)
     │           ├─ ProjectReview (score, feedback)
     │           └─ ProjectComment (content)
     └─ Certificate (certificateNumber, scorePercent, pdfUrl, qrCodeData)
         └─ CertificateVerification (ipAddress, userAgent)

User (email, passwordHash, firstName, lastName, role, status, locale)
 ├─ RefreshToken
 ├─ EmailVerificationToken
 ├─ PasswordResetToken
 ├─ UserProgress
 ├─ Bookmark
 ├─ UserAnswer
 ├─ ExerciseResult
 ├─ ProjectSubmission
 ├─ ProjectReview
 ├─ ProjectComment
 ├─ Certificate
 ├─ UserSubscription → SubscriptionPlan (code, name, priceMad, billingInterval, features)
 │   └─ Payment (amountMad, status, provider, providerPaymentId, idempotencyKey)
 │       └─ Invoice (invoiceNumber, pdfUrl)
 ├─ Streak (currentStreak, longestStreak, lastActivityDate)
 ├─ Achievement (code, title, description)
 ├─ UserActivity (type, metadata)
 ├─ Notification (type, title, body, readAt)
 ├─ PushToken (token, platform)
 ├─ Post → Comment → Like
 ├─ AuditLog (action, targetType, targetId, metadata, ipAddress)
 ├─ Leaderboard (score, period, rank)
 └─ Course (as author)

Ancillary:
 ├─ EmailQueue (to, subject, htmlBody, status)
 ├─ DailyStats (date, metric, value)
 ├─ CourseAnalytics (courseId, metric, value, date)
 └─ UserEvent (event, properties)
```

### API Route Map (all under `/api/v1`)

| Module | Routes | Auth |
|---|---|---|
| `auth` | register, login, refresh, logout, logout-all, verify-email, resend-verification, forgot-password, reset-password, change-password, me | Mixed (public + auth) |
| `courses` | domains, domains/:slug/technologies, technologies/:slug, technologies/:slug/courses, courses/:id, lessons/:id, lessons/:id/complete, lessons/:id/bookmark, bookmarks, continue-learning, CRUD for instructors | Mixed (public + role-gated) |
| `exercises` | lessons/:lessonId/exercise, exercises/:id/answer, exercises/:id/submit | Auth |
| `projects` | CRUD + submissions + reviews | Auth + role-gated |
| `certifications` | List, detail, exam, result, verify | Auth |
| `payments` | plans CRUD, subscriptions CRUD, create-checkout-session, Stripe webhook, invoices | Mixed |
| `progress` | dashboard, achievements, activity-calendar, streak | Auth |
| `users` | profile CRUD, avatar upload | Auth |
| `community` | discussions CRUD, posts CRUD, comments, likes, study groups, mentorship | Auth |
| `notifications` | list, mark-read, register-push-token | Auth |
| `admin` | dashboard stats, user management | Admin/SuperAdmin |
| `audit` | audit log query | Admin/SuperAdmin |
| `analytics` | course analytics, daily stats | Admin/Instructor |
| `instructor` | stats, my courses | Instructor+ |
| `offline` | sync endpoint | Auth |
| `upload` | file upload | Auth |

### Stripe Integration

- Full Stripe checkout session flow implemented
- Webhook handler for `checkout.session.completed`
- Idempotency key support on payments
- Plans: FREE, PREMIUM (49 MAD/mo), PREMIUM_PLUS (99 MAD/mo) — seeded; also PREMIUM_STUDENT (35 MAD/mo) and PREMIUM_ANNUAL (500 MAD/yr) defined in constants

### Offline Support

- Redux `offline.slice` with sync queue
- Backend `offline` module with sync controller
- `NetworkStatusBanner` + `OfflineIndicator` UI components
- Offline download support for courses (types defined)

---

## 5. Current State vs. Missing Features (The Roadmap)

### What's Complete / Production-Grade

- **Authentication:** Full auth flow (register, login, JWT refresh, email verification, password reset, biometric) — frontend + backend
- **RBAC:** 6-role hierarchy with permission strings and middleware enforcement
- **Courses:** Full CRUD for domains, technologies, courses, lessons with progress tracking, bookmarks, locking — both API and screens
- **Exercises:** Quiz engine (MCQ, true/false, fill_blank) with scoring, attempts, review history — both API and screens
- **Payments/Subscriptions:** Stripe integration, plan management, subscription CRUD, checkout sessions, webhooks — both API and screens
- **UI Component Library:** Rich set of shared components (Card, Button, Badge, Skeleton, Modal, Toast, etc.)
- **i18n:** French, English, Arabic (full RTL support)
- **Offline:** Queue-based sync mechanism, network status tracking, download types
- **API Documentation:** Swagger/OpenAPI spec auto-generated
- **Notifications:** In-app notifications + push tokens (FCM configured, keys pending)
- **Admin:** User management, dashboard stats, audit log viewer
- **Analytics:** Course and daily stats tracking
- **Community:** Discussions, posts, comments, likes, study groups, mentorship profiles
- **Certifications:** Exam engine, certificate generation (PDF + QR), verification system
- **Project-based learning:** Submissions, reviews, commenting workflow

### What's Using Mock / Static Data or Needs Work

| Area | Status | Detail |
|---|---|---|
| **Home screen stats** | Mock | `useUserStats()` returns hardcoded zeros (`"0"`) instead of calling a real endpoint — the backend `/progress/dashboard` endpoint exists but isn't wired to this hook |
| **Search** | Mock/Stub | `useSearchResults()` returns `never[]` — no actual search endpoint is called |
| **RoadmapScreen** | Tab present, screen imported | In `HomeStack` but content not verified |
| **Community back-end API** | Needs verification | Screens use `useDiscussions()`, `useTrendingTopics()`, `useStudyGroups()` — backend `community` module exists with full controller/service but services need review for completeness |
| **Instructor Dashboard** | Connected to API | `useInstructorStats` + `useInstructorCourses` call to `/instructor/stats` and `/instructor/courses` backed by real backend endpoints ✅ |
| **Offline sync** | Architecture built, untested | `offline.slice` + backend sync endpoint exist but actual offline-first behavior in screens (caching lessons locally, queuing mutations) not observed in most screens |
| **Push notifications** | Backend ready, frontend keys missing | `FCM_PROJECT_ID`, `FCM_PRIVATE_KEY`, `FCM_CLIENT_EMAIL` are empty in `.env` — push won't work |
| **Stripe keys** | Missing in `.env` | `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PUBLISHABLE_KEY` are empty — payments will fail in production |
| **S3/Storage keys** | Missing in `.env` | `STORAGE_ACCESS_KEY`, `STORAGE_SECRET_KEY` are empty — file uploads won't work |
| **SMTP/Email** | Missing in `.env` | `SMTP_HOST`, `SMTP_USER`, `SMTP_PASSWORD` are empty — email verification and password reset emails won't be sent |
| **Database connection** | 🔴 DOWN | Supabase project `qlxervymiozhcfjptads` returns `ENOTFOUND: tenant/user not found` — no backend API will function until this is resolved |

### V1 Production Launch — Immediate Next Steps Checklist

- [ ] **Restore database connectivity** — either resume the Supabase project `qlxervymiozhcfjptads` or create a new Supabase project and update `DATABASE_URL` + `DIRECT_URL` in `.env`, then run `npx prisma migrate dev && npm run prisma:seed`
- [ ] **Fill all missing `.env` secrets** — Stripe keys, SMTP credentials, storage keys, FCM credentials
- [ ] **Wire HomeScreen stats** — Connect `useUserStats()` to backend `GET /progress/dashboard` instead of returning hardcoded zeros
- [ ] **Implement search endpoint** — Create backend search API and wire `useSearchResults()` to it
- [ ] **End-to-end test the Community module** — Verify all community API endpoints (discussions, posts, study groups, mentorship) work end-to-end
- [ ] **End-to-end test Certification flow** — Run through exam → scoring → certificate generation → verification
- [ ] **End-to-end test Exercise flow** — Run through quiz → answer submission → scoring → review history
- [ ] **End-to-end test Payment flow** — Create subscription → Stripe checkout → webhook → plan activation
- [ ] **Test offline sync** — Download course content, go offline, take quiz, sync on reconnection
- [ ] **Run full test suite** — Execute `npm test` on both frontend and backend, fix failures
- [ ] **Security audit** — Review `helmet` config, rate limiting, CORS settings, input sanitization for production hardening
- [ ] **Production build** — Run `npx tsc --noEmit` on backend, run Expo production build, verify Docker images build without errors
