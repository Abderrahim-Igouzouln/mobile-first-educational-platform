# DevEduForge — Full Overview

## User Interface

The app has 6 bottom tabs. Most UI text is in French.

### Tab 1: Accueil (Home)
- **HomeScreen** — Landing page. Shows greeting, a progress card (current course), a horizontal carousel of learning domains (Frontend, Backend, Mobile, DevOps), a "continue learning" card, stats widget, and recent activity list.
- **DashboardScreen** — Grid of stat cards: courses count, streak days, average score, certifications earned.
- **SearchScreen** — Debounced search with category filters, recent searches, and results list.
- **RoadmapScreen** — Vertical timeline of the user's learning path with completed/active/locked nodes.

### Tab 2: Cours (Courses)
- **DomainsScreen** — Searchable list of 4 domains (gradient cards). Tap a domain → TechnologiesScreen.
- **TechnologiesScreen** — Lists technologies (React, Vue.js, Node.js, etc.) for a domain. Each shows lock/premium status.
- **CourseScreen** — Course detail with header, tab switcher (Lessons/Projects), progress bar, lesson list.
- **LessonScreen** — Renders lesson markdown content with bookmark toggle, link to exercises/video.
- **LectureScreen** — Full lecture content with an integrated notepad (add/edit/delete notes).
- **VideoPlayerScreen** — Full-screen video player (expo-video) with play/pause, seek, progress tracking.
- **OfflineCoursesScreen** — Lists downloaded courses for offline access with storage management.

### Tab 3: Exercices (Exercises)
- **ExercisesScreen** — Shows exercises for a lesson with status indicators.
- **QuizScreen** — Interactive one-question-at-a-time quiz with option cards, timer, progress bar.
- **ExerciseResultScreen** — Score, pass/fail, correct/incorrect counts, retry button.
- **ExerciseReviewScreen** — Reviews each question showing the selected answer, correct answer, and explanation.
- **ExerciseHistoryScreen** — Lists past quiz attempts with scores, dates, and status.

### Tab 4: Certifs (Certifications)
- **CertificationsScreen** — Two tabs: obtained certificates + available certifications.
- **CertificationExamScreen** — Multi-section timed exam with section navigation.
- **CertificationResultScreen** — Pass/fail with overall score, section breakdown, retry info.
- **CertificateDetailScreen** — Certificate details: number, date, technology, download.
- **CertificateViewScreen** — Public verification view with authenticity status.

### Tab 5: Communauté (Community)
- **CommunityScreen** — Hub with 3 tabs: Discussions, Study Groups, Mentorship.
- **DiscussionScreen** — Thread view with comments, upvote/downvote, reply input.
- **NewPostScreen** — Form to create a post (title, content, tags, category).
- **MentorshipScreen** — List of mentors with expertise, rating, session count, booking.
- **StudyGroupsScreen** — List of study groups with member counts, categories.
- **StudyGroupDetailScreen** — Group detail: description, members, active discussions.
- **MentorProfileScreen** — Mentor bio, expertise tags, rating, session history, booking button.

### Tab 6: Profil (Profile)
- **ProfileScreen** — Avatar, stats, settings menu items, logout/delete actions.
- **EditProfileScreen** — Edit name, email, bio, avatar.
- **SettingsScreen** — Menu: Language, Security, Notifications, Data, About, Subscription.
- **LanguageScreen** — Switch between French, Arabic, English.
- **SecurityScreen** — Change password, enable biometrics, view active sessions.
- **NotificationSettingsScreen** — Toggle toasts for lessons, courses, exercises, promotions, streaks.
- **DataSettingsScreen** — Clear cache, manage offline downloads.
- **AboutScreen** — App version, build, company email, privacy & terms links.
- **SubscriptionScreen** — Current plan + upgrade options (Free/Premium/Premium+).
- **PaymentScreen** — Card payment form (number, expiry, CVC).
- **PaymentSuccessScreen** — Confirmation with plan name, dates.
- **InstructorDashboardScreen** — Stats cards (courses, students, rating, completions).

### Auth Flow (before login)
- **OnboardingScreen** — 3-pager introducing offline learning, local pricing, certifications.
- **LoginScreen** — Email + password form with validation.
- **RegisterScreen** — Full form with password strength indicator + terms checkbox.
- **ForgotPasswordScreen** — Email input with resend cooldown timer.
- **ResetPasswordScreen** — New password + confirmation.
- **VerifyEmailScreen** — Countdown to resend verification email.
- **BiometricSetupScreen** — Enable fingerprint/face unlock.

---

## Mobile Project (`deveduforge-mobile/src`)

### `core/` — App backbone
| File | What it does |
|---|---|
| `core/api/apiClient.ts` | Creates the Axios instance with base URL, interceptors attached |
| `core/api/api.types.ts` | Generic types for API response, pagination, error envelopes |
| `core/api/interceptors/authInterceptor.ts` | Attaches Bearer token to requests; auto-refreshes on 401 |
| `core/api/interceptors/errorInterceptor.ts` | Translates Axios errors into French ApiError messages |
| `core/api/interceptors/loggingInterceptor.ts` | Logs request/response/error to console in dev |
| `core/api/endpoints/auth.endpoints.ts` | login, register, logout, refresh, forgot/reset password, verify email, getMe |
| `core/api/endpoints/course.endpoints.ts` | getDomains, getTechnologies, getCourses, getLessons, bookmarks, continue-learning |
| `core/api/endpoints/exercise.endpoints.ts` | getExerciseByLesson, submitAnswer, submitExercise |
| `core/api/endpoints/project.endpoints.ts` | getProjects, submitProject, getSubmissions, addComment |
| `core/api/endpoints/certification.endpoints.ts` | getCertificates, issueCertificate, verifyCertificate |
| `core/api/endpoints/user.endpoints.ts` | getProfile, updateProfile, updatePreferences, deleteAccount, exportData |
| `core/api/endpoints/payment.endpoints.ts` | getPlans, createSubscription, createCheckoutSession, getPayments, getInvoices |
| `core/api/endpoints/notification.endpoints.ts` | getNotifications, markRead, markAllRead |
| `core/api/endpoints/instructor.endpoints.ts` | getInstructorStats, getInstructorCourses |
| `core/auth/AuthContext.tsx` | React context shape: user, tokens, isLoading, isAuthenticated, login, register, logout |
| `core/auth/AuthProvider.tsx` | Implements auth state: restores session on mount, manages tokens |
| `core/auth/useAuth.ts` | Hook to consume AuthContext |
| `core/auth/auth.types.ts` | Interfaces: User, AuthTokens, LoginCredentials, RegisterData |
| `core/auth/authStorage.ts` | get/set/clear tokens from SecureStore (AsyncStorage on web) |
| `core/config/constants.ts` | Pagination sizes, storage keys, animation durations, date formats |
| `core/config/env.config.ts` | Reads/validates env vars (API_URL, timeout, Sentry DSN, etc.) |
| `core/config/i18n.config.ts` | List of supported languages (fr, ar, en) |
| `core/config/app.config.ts` | Centralized config object (API URL, platform flags, version) |
| `core/storage/secureStorage.ts` | Wraps SecureStore (native) / AsyncStorage (web) with JSON |
| `core/storage/cacheManager.ts` | Time-based cache on AsyncStorage with cleanup |
| `core/storage/asyncStorage.ts` | Simple AsyncStorage get/set/remove with JSON |
| `core/utils/passwordStrength.ts` | Scores password 0–5, returns French label |
| `core/utils/hooks/useDebounce.ts` | Generic debounce hook |
| `core/utils/formatters/text.formatter.ts` | truncate, capitalize, initials, slugify |
| `core/utils/formatters/currency.formatter.ts` | Format MAD amounts |
| `core/utils/formatters/date.formatter.ts` | Relative time ("il y a 3h"), short date, duration |
| `core/utils/validators/forms.validator.ts` | Zod schemas for login, register, password reset forms |
| `core/hooks/useAsync.ts` | Generic async wrapper with loading/data/error state |
| `core/hooks/useNetworkStatus.ts` | NetInfo listener: connectivity + connection type |
| `core/hooks/useDebounce.ts` | Debounce hook (300ms default) |
| `core/navigation/RootNavigator.tsx` | Switches AuthNavigator / MainNavigator via isAuthenticated |
| `core/navigation/AuthNavigator.tsx` | Stack: Onboarding → Login → Register → ForgotPassword → ResetPassword → VerifyEmail → BiometricSetup |
| `core/navigation/MainNavigator.tsx` | Bottom tabs: Home, Courses, Exercises, Certifications, Community, Profile |
| `core/navigation/CourseNavigator.tsx` | Courses tab stack: Domains → Technologies → Course → Lesson/Lecture/Video/Offline |
| `core/navigation/navigation.types.ts` | All TypeScript param list types for every screen |

### `lib/` — Third-party wrappers
| File | What it does |
|---|---|
| `lib/i18n/i18n.config.ts` | i18next init with locale from AsyncStorage |
| `lib/i18n/useTranslation.ts` | Re-exports react-i18next hook |
| `lib/i18n/locales/en/common.json` | English translation strings by domain |
| `lib/i18n/locales/fr/common.json` | French translation strings |
| `lib/i18n/locales/ar/common.json` | Arabic (RTL) translation strings |
| `lib/react-query/queryClient.ts` | React Query client with stale/retry defaults |
| `lib/react-query/queryKeys.ts` | Structured cache keys hierarchy |
| `lib/react-navigation/deepLinking.ts` | Deep links for reset-password, courses, certificates |
| `lib/react-navigation/navigationRef.ts` | Navigation ref for outside-component navigation |
| `lib/redux/store.ts` | Redux store config |
| `lib/redux/rootReducer.ts` | Combines all slice reducers |
| `lib/redux/hooks/useAppSelector.ts` | Typed useSelector hook |
| `lib/redux/hooks/useAppDispatch.ts` | Typed useDispatch hook |
| `lib/redux/slices/auth.slice.ts` | setCredentials, logout, setBiometricEnabled |
| `lib/redux/slices/course.slice.ts` | Last-visited domain/technology persistence |
| `lib/redux/slices/exercise.slice.ts` | Active quiz state (answers, current question) |
| `lib/redux/slices/certification.slice.ts` | Certifications cache with timestamp |
| `lib/redux/slices/offline.slice.ts` | Offline sync queue + online status |
| `lib/redux/slices/ui.slice.ts` | Theme, locale, banner state |

### `shared/` — Reusable UI & theme
| File | What it does |
|---|---|
| `shared/constants/colors.ts` | Brand, semantic, neutral, dark-mode palette |
| `shared/constants/theme.ts` | Aggregates colors/typography/spacing/radius/shadows |
| `shared/constants/spacing.ts` | xxs(2) → huge(48) scale |
| `shared/constants/typography.ts` | Font stacks + style presets (h1, h2, body, code, button...) |
| `shared/constants/radius.ts` | sm(8), md(12), lg(14), xl(16), pill(999) |
| `shared/constants/shadows.ts` | Android elevation + iOS boxShadow |
| `shared/hooks/useKeyboard.ts` | Keyboard visibility + height |
| `shared/hooks/useTheme.ts` | Returns light/dark theme from Redux |
| `shared/components/ui/Button.tsx` | primary/secondary/outline/ghost/danger + loading + icon |
| `shared/components/ui/Input.tsx` | Input with label, error, left icon, password toggle |
| `shared/components/ui/Card.tsx` | Surface container with shadow + optional press |
| `shared/components/ui/Avatar.tsx` | Image or color-coded initials fallback |
| `shared/components/ui/Badge.tsx` | Pill label: success/error/warning/info/default |
| `shared/components/ui/Chip.tsx` | Toggleable filter chip (onPress optional) |
| `shared/components/ui/Modal.tsx` | Bottom-sheet with title bar, close, content, cancel |
| `shared/components/ui/Toast.tsx` | Toast wrapper (success/error/info/warning) |
| `shared/components/ui/SkeletonLoader.tsx` | Animated opacity-pulse placeholder |
| `shared/components/ui/OfflineIndicator.tsx` | Sync status icon (synced/syncing/offline) |
| `shared/components/ui/ActivityHeatmap.tsx` | GitHub-style activity grid |
| `shared/components/ui/NetworkStatusBanner.tsx` | Offline warning banner |
| `shared/components/ui/EmptyState.tsx` | Centered icon + title + message + action button |
| `shared/components/ui/ErrorBoundary.tsx` | Class-based catch + retry |
| `shared/components/ui/LoadingSpinner.tsx` | Orange ActivityIndicator, inline or fullscreen |
| `shared/components/layout/BottomTabBar.tsx` | Custom tab bar with safe area |
| `shared/components/layout/ScreenWrapper.tsx` | SafeAreaView + StatusBar config |
| `shared/components/layout/Container.tsx` | Horizontal padding + optional ScrollView |
| `shared/components/forms/FormInput.tsx` | Input + react-hook-form integration |
| `shared/components/forms/FormSelect.tsx` | Modal dropdown + react-hook-form |
| `shared/components/forms/FormValidation.tsx` | Inline validation message with icon |

### `modules/` — Feature modules

#### `modules/home/`
| File | What it does |
|---|---|
| `home.types.ts` | Domain, ContinueLearning, StatItem, ActivityItem interfaces |
| `services/homeService.ts` | RQ hooks: useDomains, useContinueLearning, useUserStats, useSearchResults |
| `screens/HomeScreen.tsx` | Main dashboard: greeting, progress, domains, continue-learning, stats, activity |
| `screens/DashboardScreen.tsx` | Stat cards grid |
| `screens/SearchScreen.tsx` | Debounced search with filters, history, results |
| `screens/RoadmapScreen.tsx` | Learning path vertical timeline |
| `components/Header.tsx` | Logo + notification bell with badge |
| `components/StatsWidget.tsx` | Horizontal stat card row |
| `components/ProgressCard.tsx` | Navy card: course name, progress bar, remaining lessons |
| `components/ContinueLearningCard.tsx` | Next lesson to resume |
| `components/DomainCard.tsx` | Compact domain card for carousel |
| `components/SearchBar.tsx` | Icon + debounced input |
| `components/RecentActivityList.tsx` | Activity feed with colored dots |
| `components/DomainCarousel.tsx` | Horizontal FlatList of DomainCards |

#### `modules/courses/`
| File | What it does |
|---|---|
| `courses.types.ts` | Domain, Technology, Course, Lesson, Lecture, Bookmark, DownloadState |
| `services/courseService.ts` | RQ hooks: useDomains, useTechnologies, useCourse, useLessons, useBookmarks... |
| `services/downloadService.ts` | Offline download manager + React hooks |
| `hooks/useNotes.ts` | Lesson notes CRUD with AsyncStorage |
| `hooks/useBookmarks.ts` | Bookmark toggle with optimistic updates |
| `hooks/useCourseProgress.ts` | Progress %, remaining, last-computed stats |
| `screens/DomainsScreen.tsx` | Searchable domain list with gradient cards |
| `screens/TechnologiesScreen.tsx` | Technology list per domain |
| `screens/CourseScreen.tsx` | Course detail: header, tabs (lessons/projects), progress, lesson list |
| `screens/LessonScreen.tsx` | Lesson markdown + bookmark + action buttons |
| `screens/LectureScreen.tsx` | Full lecture + integrated notepad |
| `screens/VideoPlayerScreen.tsx` | expo-video player with controls |
| `screens/OfflineCoursesScreen.tsx` | Downloaded courses list + storage |
| `components/DomainCard.tsx` | Gradient card: icon, name, progress, chevron |
| `components/TechnologyCard.tsx` | Gradient card: icon, level badge, lock, premium |
| `components/LessonItem.tsx` | Row: status + type icon, title, duration |
| `components/CourseHeader.tsx` | Gradient header + back + tab switcher |
| `components/BookmarkButton.tsx` | Filled/outline toggle |
| `components/CourseProgress.tsx` | Progress bar with completion count |
| `components/MarkdownRenderer.tsx` | Markdown renderer with code highlighting |
| `components/CodeBlock.tsx` | Syntax-highlighted code block |

#### `modules/exercises/`
| File | What it does |
|---|---|
| `exercises.types.ts` | Exercise, Question, Option, Answer, QuizAttempt, QuizResult |
| `services/exerciseService.ts` | RQ hooks: useExercise, useSubmitAnswer, useSubmitExercise |
| `hooks/useQuizTimer.ts` | Countdown with expiry callback |
| `screens/ExercisesScreen.tsx` | Exercise list per lesson |
| `screens/QuizScreen.tsx` | One-at-a-time quiz with timer + progress |
| `screens/ExerciseResultScreen.tsx` | Score, pass/fail, counts, retry |
| `screens/ExerciseReviewScreen.tsx` | Answer review with explanations |
| `screens/ExerciseHistoryScreen.tsx` | Past attempts list |
| `components/ResultCircle.tsx` | SVG percentage circle |
| `components/ReviewItem.tsx` | Question review row |
| `components/OptionCard.tsx` | Selected/correct/wrong states |
| `components/ResultStatsRow.tsx` | Correct/incorrect/time row |
| `components/ExerciseCard.tsx` | Title, difficulty, count, status |
| `components/QuizProgressBar.tsx` | Thin progress indicator |
| `components/QuestionCard.tsx` | Question text + OptionCards |

#### `modules/projects/`
| File | What it does |
|---|---|
| `projects.types.ts` | Project, ProjectStep, ProjectSubmission, ProjectReview |
| `services/projectService.ts` | RQ hooks: useProjects, useProject, useSubmissions, useSubmitProject |
| `screens/ProjectsScreen.tsx` | Project list with filter chips |
| `screens/ProjectDetailScreen.tsx` | Instructions, steps, requirements, resources |
| `screens/ProjectSubmissionScreen.tsx` | GitHub URL + file upload form |
| `screens/ProjectReviewScreen.tsx` | Grade, comments, resubmit |
| `components/ProjectCard.tsx` | Title, difficulty, techs, status badge |
| `components/ProjectStepItem.tsx` | Checkable step row |
| `components/SubmissionCard.tsx` | Avatar, badge, date, grade, feedback |
| `components/ProjectStatusBadge.tsx` | Color-coded status pill |

#### `modules/certifications/`
| File | What it does |
|---|---|
| `certifications.types.ts` | Certificate, CertificationAttempt, ExamSection, ExamQuestion |
| `services/certificationService.ts` | RQ hooks: useCertificates, useIssue, useVerify |
| `screens/CertificationsScreen.tsx` | Obtained + available tabs |
| `screens/CertificationExamScreen.tsx` | Timed multi-section exam |
| `screens/CertificationResultScreen.tsx` | Pass/fail + section breakdown |
| `screens/CertificateDetailScreen.tsx` | Number, date, tech, download |
| `screens/CertificateViewScreen.tsx` | Public verification |
| `components/CertificateCard.tsx` | Tech, level, date, score |
| `components/CertificatePreview.tsx` | Visual certificate render |
| `components/ExamWarningModal.tsx` | Rules modal before exam |
| `components/CertificationBadge.tsx` | Circular tech badge |

#### `modules/community/`
| File | What it does |
|---|---|
| `community.types.ts` | UserBrief, Discussion, Comment, StudyGroup, Mentor |
| `services/communityService.ts` | RQ hooks (mock-backed): topics, discussions, groups, mentors |
| `screens/CommunityScreen.tsx` | 3 tabs: Discussions, Groups, Mentors |
| `screens/DiscussionScreen.tsx` | Thread with comments + votes |
| `screens/NewPostScreen.tsx` | Create post: title, body, tags, category |
| `screens/MentorshipScreen.tsx` | Mentor listing |
| `screens/StudyGroupsScreen.tsx` | Group listing |
| `screens/StudyGroupDetailScreen.tsx` | Group detail + members |
| `screens/MentorProfileScreen.tsx` | Bio, tags, rating, booking |
| `components/DiscussionCard.tsx` | Title, author, tags, votes, comments |
| `components/CommentItem.tsx` | Avatar, content, likes, replies |
| `components/MentorCard.tsx` | Avatar, name, tags, rating, price |
| `components/StudyGroupCard.tsx` | Name, members, join status |
| `components/TopicChip.tsx` | Trending topic pill |
| `components/PostComposer.tsx` | Title + body + tags form |

#### `modules/auth/`
| File | What it does |
|---|---|
| `auth.validation.ts` | Zod schemas for login, register, forgot/reset password |
| `screens/OnboardingScreen.tsx` | 3-page paginated intro |
| `screens/LoginScreen.tsx` | Email/password form with validation |
| `screens/RegisterScreen.tsx` | Full form with strength + terms |
| `screens/ForgotPasswordScreen.tsx` | Email + cooldown |
| `screens/ResetPasswordScreen.tsx` | New password + confirm |
| `screens/VerifyEmailScreen.tsx` | Resend cooldown |
| `screens/BiometricSetupScreen.tsx` | Enable fingerprint/face |
| `components/PasswordStrengthIndicator.tsx` | 4-segment colored bar |
| `components/TermsCheckbox.tsx` | Pressable checkbox + link |

#### `modules/profile/`
| File | What it does |
|---|---|
| `profile.types.ts` | ProfileStats, ProfileData, NotificationSetting, SessionInfo |
| `services/profileService.ts` | RQ hooks: useProfile, useUpdateProfile, useDeleteAccount |
| `screens/ProfileScreen.tsx` | Avatar, stats, settings menu |
| `screens/EditProfileScreen.tsx` | Name, email, bio, avatar form |
| `screens/SettingsScreen.tsx` | Menu: language, security, notifications, data, about |
| `screens/LanguageScreen.tsx` | fr/ar/en selection |
| `screens/SecurityScreen.tsx` | Password change, biometrics, sessions |
| `screens/NotificationSettingsScreen.tsx` | Toggle categories |
| `screens/DataSettingsScreen.tsx` | Cache, offline data |
| `screens/AboutScreen.tsx` | Version, email, links |
| `components/MenuItem.tsx` | Icon + label row |
| `components/ProfileAvatar.tsx` | Large avatar + edit button |
| `components/ProfileStatCard.tsx` | Value + label |

#### Other modules
| File | What it does |
|---|---|
| `notifications/services/notificationService.ts` | RQ hooks: useNotifications, useMarkRead, useMarkAllRead |
| `notifications/screens/NotificationCenterScreen.tsx` | Notification list with mark-all-read |
| `instructor/services/instructorService.ts` | RQ hooks: useInstructorStats, useInstructorCourses |
| `instructor/screens/InstructorDashboardScreen.tsx` | Stats cards + course list |
| `subscription/subscription.types.ts` | Plan, PlanId, CurrentSubscription, SubscriptionStatus |
| `subscription/services/subscriptionService.ts` | RQ hooks: usePlans, useSubscription, useCreateCheckout |
| `subscription/screens/SubscriptionScreen.tsx` | Plan listing + upgrade |
| `subscription/screens/PaymentScreen.tsx` | Card form |
| `subscription/screens/PaymentSuccessScreen.tsx` | Confirmation |
| `subscription/components/PlanCard.tsx` | Price, features, subscribe button |
| `subscription/components/FeatureComparisonTable.tsx` | Side-by-side tiers |

---

## Backend Project (`deveduforge-backend`)

### Root config files
| File | What it does |
|---|---|
| `package.json` | Scripts & dependencies |
| `tsconfig.json` | Strict TS config, ES2022 target |
| `tsconfig.build.json` | Build config (excludes tests) |
| `jest.config.js` | Jest setup with coverage thresholds |
| `nodemon.json` | Watches src/ for .ts/.json changes |
| `.eslintrc.js` | Airbnb-typescript rules |
| `.prettierrc` | Formatting rules |
| `Dockerfile` | Production image |
| `docker-compose.yml` | Full production stack |
| `nginx.conf` | Reverse proxy config |

### `src/index.ts` — Bootstrap
Loads env, connects Prisma + Redis (optional), starts Express HTTP server. Graceful shutdown on SIGTERM/SIGINT.

### `src/app.ts` — Express app factory
Applies middleware: helmet, CORS, rate-limit, compression, request ID, logging, auth, error handler, Swagger docs. Mounts all routes under `/api/v1`.

### `src/config/` — App configuration
| File | What it does |
|---|---|
| `config/database.ts` | PrismaClient singleton with query logging |
| `config/redis.ts` | ioredis client (lazyConnect, retry strategy) |
| `config/jwt.ts` | JWT secret loader with validation |
| `config/environment.ts` | Zod-validated schema for all env vars |
| `config/logger.ts` | Winston with sensitive-field sanitization |
| `config/sentry.ts` | Sentry stub (disabled locally) |
| `config/stripe.ts` | Stripe SDK client |
| `config/storage.ts` | S3-compatible storage config |
| `config/email.ts` | SMTP config |
| `config/multer.ts` | In-memory upload with size/type limits |
| `config/cors.ts` | Allowed origins list |
| `config/rateLimit.ts` | Global + auth rate-limit config |
| `config/swagger.ts` | OpenAPI 3.0.3 spec generation |

### `src/middleware/` — 18 middleware
| File | What it does |
|---|---|
| `auth.middleware.ts` | JWT Bearer token verification |
| `optionalAuth.middleware.ts` | Extracts user if token present, doesn't reject |
| `role.middleware.ts` | Minimum role guard |
| `emailVerified.middleware.ts` | Rejects unverified emails |
| `subscriptionGuard.middleware.ts` | Checks active subscription plan |
| `validation.middleware.ts` | Zod schema validation for body/query/params |
| `ownership.middleware.ts` | Verifies resource ownership |
| `errorHandler.middleware.ts` | Global JSON error handler |
| `notFound.middleware.ts` | 404 catch-all |
| `rateLimiter.middleware.ts` | Per-route rate limiting |
| `cors.middleware.ts` | CORS headers |
| `helmet.middleware.ts` | Security headers |
| `compression.middleware.ts` | Gzip/brotli |
| `logging.middleware.ts` | HTTP request logging |
| `requestId.middleware.ts` | UUID per request |
| `sanitize.middleware.ts` | Strips HTML/script tags |
| `idempotency.middleware.ts` | Idempotency-key dedup |
| `maintenanceMode.middleware.ts` | Blocks requests when enabled |

### `src/utils/` — Utilities
| File | What it does |
|---|---|
| `jwt.util.ts` | signAccessToken, signRefreshToken, verifyRefreshToken |
| `crypto.util.ts` | hashToken, compareToken, randomToken |
| `apiResponse.util.ts` | sendSuccess, sendCreated, sendNoContent, sendPaginated |
| `pagination.util.ts` | extract page/limit from query |
| `errors.util.ts` | AppError, NotFoundError, ForbiddenError, etc. |
| `email.util.ts` | Nodemailer send |
| `slug.util.ts` | Slugify strings |
| `sanitize.util.ts` | HTML sanitization |
| `date.util.ts` | Date helpers |
| `validator.util.ts` | Zod validation wrapper |
| `retry.util.ts` | Async retry with backoff |
| `qrSignature.util.ts` | HMAC for certificate QR URLs |
| `fileUpload.util.ts` | S3 + local file upload |
| `sms.util.ts` | SMS sending |

### `src/constants/` — Enums & constants
| File | What it does |
|---|---|
| `errorCodes.ts` | Application error code enum |
| `httpStatus.ts` | Status code → name mapping |
| `permissions.ts` | Role-based permission flags |
| `roles.ts` | Role enum (guest → superadmin) |
| `subscriptionPlans.ts` | Plan features & pricing |

### `src/modules/routes.ts` — Route aggregator
Imports all module route files and mounts them under `/api/v1`.

### `src/modules/auth/` — Authentication
| File | What it does |
|---|---|
| `auth.controller.ts` | register, login, logout, refresh, verify-email, forgot/reset-password, getMe |
| `auth.service.ts` | Business logic: password hashing, token generation, email verification flow |
| `auth.repository.ts` | Prisma queries for users, sessions, refresh tokens |
| `auth.routes.ts` | Routes with Swagger docs |
| `auth.types.ts` | Auth payload interfaces |
| `auth.validation.ts` | Zod schemas for all auth endpoints |
| `strategies/refreshToken.strategy.ts` | Refresh token rotation |

### `src/modules/course/` — Courses
| File | What it does |
|---|---|
| `course.controller.ts` | List domains, technologies, courses, lessons; manage bookmarks & reviews |
| `course.service.ts` | Business logic: enrollment, progress, bookmarks |
| `course.repository.ts` | Prisma queries for domains, technologies, courses, lessons |
| `course.routes.ts` | Routes with docs |
| `course.validation.ts` | Zod schemas for course/lesson CRUD |

### `src/modules/exercise/` — Exercises
| File | What it does |
|---|---|
| `exercise.controller.ts` | Get exercise by lesson, submit answer, submit exercise |
| `exercise.service.ts` | Answer validation, scoring logic |
| `exercise.repository.ts` | Prisma queries for exercises, questions, answers |

### `src/modules/project/` — Projects
| File | What it does |
|---|---|
| `project.controller.ts` | List projects, submit, review, comment |
| `project.service.ts` | Submission workflow, evaluation |
| `project.repository.ts` | Prisma queries for projects, submissions |

### `src/modules/certification/` — Certifications
| File | What it does |
|---|---|
| `certification.controller.ts` | Issue, list, verify, revoke certificates |
| `certification.service.ts` | Issuance logic, QR code generation |
| `services/pdfGenerator.service.ts` | PDF certificate generation with PDFKit |
| `services/qrCode.service.ts` | QR code for certificate verification |

### `src/modules/payment/` — Payments
| File | What it does |
|---|---|
| `payment.controller.ts` | Plans, subscriptions, checkout, webhooks, invoices |
| `payment.service.ts` | Subscription lifecycle, payment processing |
| `providers/stripe.provider.ts` | Stripe Checkout Session + webhook handling |

### `src/modules/progress/` — Progress tracking
| File | What it does |
|---|---|
| `progress.controller.ts` | Dashboard, achievements, activity calendar, streak, time-series, domain breakdown |
| `progress.service.ts` | Streak calculation, XP computation, completion tracking |

### `src/modules/community/` — Community
| File | What it does |
|---|---|
| `community.controller.ts` | Posts CRUD, comments, likes, reports, leaderboard |
| `community.service.ts` | Moderation, content ranking |

### `src/modules/user/` — Users
| File | What it does |
|---|---|
| `user.controller.ts` | Profile CRUD, preferences, account deletion, data export |
| `user.service.ts` | Profile management, search |

### Other modules
| Module | What it does |
|---|---|
| `admin/` | Dashboard stats, user management, content moderation |
| `analytics/` | Event tracking, dashboard overviews |
| `audit/` | Entity audit trail logging |
| `notification/` | In-app + push notifications, email/SMS providers |
| `offline/` | Course manifest + sync payload processing, conflict resolver |
| `instructor/` | Instructor stats, student progress, course insights |
| `upload/` | File upload for avatars, project files, images |

### `prisma/` — Database
| File | What it does |
|---|---|
| `schema.prisma` | All models: User, Course, Lesson, Exercise, Question, AnswerOption, Project, Certificate, Post, Payment, Subscription... |
| `seed.ts` | Seeds DB: plans, users (admin/instructor/student), domains, technologies, 16 courses with content |
| `update-content.ts` | Upserts course content only |
| `content/index.ts` | Barrel export of ALL_COURSE_CONTENT map |
| `content/react-fundamentals.ts` | 4 lessons + 20 MCQ + 1 project on React basics |
| `content/react-advanced.ts` | 4 lessons on hooks, context, performance |
| `content/vuejs-intro.ts` | 4 lessons on Vue.js 3 + Composition API |
| `content/nodejs-practice.ts` | 4 lessons on Express + TypeScript APIs |
| `content/react-native-foundation.ts` | 4 lessons on React Native cross-platform |
| `content/docker-essentials.ts` | 4 lessons on containers, Dockerfile, Compose |
| `migrations/` | 3 migration SQL files (init, add_pending_substatus, remove_cmi_enum) |

### `tests/` — Tests
| File | What it does |
|---|---|
| `tests/setup/globalSetup.ts` | Sets test env vars before jest runs |
| `tests/unit/utils/jwtUtil.test.ts` | 4 tests: sign + verify access/refresh tokens |
| `tests/unit/services/courseService.test.ts` | 5 tests: domains, technologies, course detail |
| `tests/unit/services/projectService.test.ts` | 6 tests: CRUD, submission, review |
| `tests/unit/services/exerciseService.test.ts` | 6 tests: get, answer, submit exercise |

### `scripts/`
| File | What it does |
|---|---|
| `scripts/setup-env.ts` | Validates all env vars and prints config report |
| `scripts/patch-lucide.mjs` | Postinstall script that patches lucide-react-native's broken exports field |
