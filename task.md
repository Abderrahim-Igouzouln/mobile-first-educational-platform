# DevEduForge — Review of Your Changes (v2) & What's Still Needed

**Compared against:** the previous export audited in `DevEduForge_Audit_and_Fix_Guide.md` and `DevEduForge_Feature_Roadmap_and_Certificates.md`
**Method:** full diff of both codebases, then a targeted re-audit of every area flagged before, plus the new files you added.

---

## 1. The headline: you shipped almost everything from the last two reports

This is a genuinely strong second pass. Confirmed fixed, verified in the actual code (not just "should be"):

- ✅ **Projects feature is now reachable.** `ProjectsScreen`, `ProjectDetailScreen`, `ProjectSubmissionScreen`, `ProjectReviewScreen` are all registered in `CourseNavigator.tsx` and typed correctly in `navigation.types.ts`.
- ✅ **`LectureScreen` bug fixed.** It now receives and uses `courseId` from route params instead of misusing `lessonId`.
- ✅ **New pages built and correctly wired into navigation**: `LeaderboardScreen`, `MentorProfileScreen`, `StudyGroupDetailScreen`, `CourseCompleteScreen`, `CourseReviewsScreen`, `SavedCoursesScreen` — all registered in `MainNavigator.tsx`/`CourseNavigator.tsx` with typed params, not orphaned like the old Projects screens were.
- ✅ **Leaderboard is now real**, not a stub — `LeaderboardScreen.tsx` uses a live `useQuery`, not mock data.
- ✅ **English locale added properly** — `en/common.json` has the same key count as `fr/common.json` (251 lines each), and it's actually registered in `i18n.config.ts`'s `resources` object and selectable in `LanguageScreen.tsx`. This is a clean, complete implementation, not a half-wire.
- ✅ **Backend reorganized** into `config/app`, `config/database`, `config/security`, `config/storage`, `config/integrations`, plus `middleware/auth`, `middleware/validation`, `middleware/security`, `middleware/error`, `middleware/performance`, `middleware/request` folders, and `utils/response`, `utils/security`, `utils/system`, `utils/communication`, `utils/helpers`. This is a meaningfully more professional structure than the old flat `config/*.ts`/`middleware/*.ts` layout.
- ✅ **Content overhaul is the best change in this pass.** All 16 courses now have real, per-course content files (`prisma/content/{frontend,backend,mobile,devops-cloud}/...`), split further into `courses/`, `exercises/`, `projects/` sub-files per course — even more organized than what I suggested. I spot-checked "Fondamentaux de React": 4 real lessons, each with genuine explanations, multiple runnable TypeScript/React code samples, a "Résumé" section, and a real, detailed project brief with concrete requirements and 5 evaluation criteria. This is publication-quality courseware, not filler.
- ✅ **Backend Certificate schema matches the design exactly**: `courseId`, `status` (`locked/unlocked/paid`), `priceMad`, `unlockedAt`, `paidAt`, `paymentId` are all there, with the correct `@@unique([userId, courseId])`.
- ✅ **`certification.service.ts` has a complete, correct `getCourseCompletionStatus()` and `checkAndUnlockCertificate()`** — the upsert logic, the lesson/exercise/project completion checks, all match the spec and are implemented cleanly.
- ✅ CI workflow added (`.github/workflows/ci.yml`), plus new unit tests (`courseService.test.ts`, `exerciseService.test.ts`, `projectService.test.ts`, `jwtUtil.test.ts`) and a Jest `globalSetup.ts`.

You clearly worked through the priority list in order. Good execution.

---

## 2. What's still broken or incomplete — the real punch-list

### 2.1 Critical: the certificate unlock logic exists but is never called

`checkAndUnlockCertificate(userId, courseId)` in `certification.service.ts` is fully implemented and correct — but I searched the entire backend and **nothing calls it.** It's not called from:
- `course.service.ts`'s `completeLesson()` (line ~104) — where a lesson gets marked `completed`
- `exercise.service.ts`'s `submitExercise()` — where an exercise result gets scored
- `project.service.ts`'s `reviewSubmission()` — where a project gets approved/rejected

Right now, a user can 100% finish a course and their certificate will sit at `status: 'locked'` forever, because nothing ever flips it to `unlocked`. This is the single most important fix left — it's the crux of the entire feature you asked for.

**Fix — call it from all three completion points:**

```ts
// course.service.ts — completeLesson()
async completeLesson(lessonId: string, userId: string, timeSpentSec = 0) {
  const lesson = await repo.findLessonById(lessonId);
  if (!lesson) throw new NotFoundError('Leçon introuvable.');

  await repo.upsertProgress(userId, lessonId, { status: 'completed', completedAt: new Date(), timeSpentSec });
  await repo.updateStreak(userId);
  await prisma.userActivity.create({ data: { userId, type: 'lesson.completed', metadata: { lessonId, courseId: lesson.courseId } } }).catch(() => {});

  // NEW — re-check certificate eligibility every time a lesson finishes
  await new CertificationService().checkAndUnlockCertificate(userId, lesson.courseId).catch(() => {});

  return { lessonId, status: 'completed' };
}
```

Do the equivalent in `exercise.service.ts`'s `submitExercise()` (after scoring — you'll need to fetch `exercise.lesson.courseId` first since `Exercise` only has `lessonId`) and in `project.service.ts`'s `reviewSubmission()` (after `updateSubmissionStatus`, only when `score >= 70` — you'll need `submission.project.courseId`). In all three cases, swallow errors with `.catch(() => {})` or wrap in a try/catch so a certificate-check failure never blocks the primary action (lesson completion, exercise submission, review) from succeeding.

### 2.2 Critical: `CertificateDetailScreen`'s buttons are all `Alert.alert` mocks, even though the real service hooks already exist

This is the most surprising gap: `certificationService.ts` already has correctly-wired mutations —`useCheckoutCertificate`-style hook (line 42, calling `certificationEndpoints.requestCheckout`) and a download hook (line 47, calling `certificationEndpoints.downloadCertificate`) — pointing at real, working backend endpoints. But `CertificateDetailScreen.tsx` doesn't use either of them. Instead:

```ts
const handleDownload = () => {
  Alert.alert('Téléchargement', 'Le certificat sera téléchargé au format PDF.');
};
const handleShare = () => {
  Alert.alert('Partager', 'Ouverture des options de partage...');
};
const handleVerify = () => {
  Alert.alert('Vérification', 'Redirection vers la page de vérification...');
};
const handlePay = () => {
  Alert.alert('Paiement', `Redirection vers le paiement de ${certificate?.priceMad} MAD`);
};
```

None of these four buttons actually do anything real. This means even once §2.1 is fixed and a certificate correctly becomes `unlocked`, the user still can't pay for or download it — the screen just shows an alert box.

**Fix, one handler at a time:**

```ts
import { useCheckoutCertificate, useDownloadCertificate } from '../services/certificationService';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const checkoutMutation = useCheckoutCertificate();
const downloadMutation = useDownloadCertificate();

const handlePay = async () => {
  if (!certificate) return;
  const checkout = await checkoutMutation.mutateAsync(certificate.id);
  // PaymentScreen needs a `certificate` purchase mode — see §2.3
  navigation.getParent()?.navigate('ProfileTab', {
    screen: 'PaymentScreen',
    params: { type: 'certificate', certificateId: certificate.id, amountMad: checkout.amountMad },
  });
};

const handleDownload = async () => {
  if (!certificate) return;
  const result = await downloadMutation.mutateAsync(certificate.id);
  const fileUri = `${FileSystem.documentDirectory}${result.fileName}`;
  if (result.pdfData) {
    await FileSystem.writeAsStringAsync(fileUri, result.pdfData, { encoding: FileSystem.EncodingType.Base64 });
  } else if (result.pdfUrl) {
    await FileSystem.downloadAsync(result.pdfUrl, fileUri);
  }
  await Sharing.shareAsync(fileUri);
};

const handleShare = async () => {
  if (!certificate) return;
  await Share.share({
    message: `Je viens d'obtenir ma certification ${certificate.technologyName} sur DevEduForge ! Vérifiez-la ici : ${certificate.verificationUrl}`,
  });
};

const handleVerify = () => {
  if (!certificate) return;
  Linking.openURL(certificate.verificationUrl);
};
```

(`expo-file-system` and `expo-sharing` are already Expo-standard packages; add them with `npx expo install expo-file-system expo-sharing` if not already present, and use the built-in React Native `Share` API for `handleShare`, imported from `react-native`.)

### 2.3 `PaymentScreen` was never extended for certificate purchases

`handlePay` above assumes `PaymentScreen` accepts a `type: 'certificate'` param, but I checked `PaymentScreen.tsx` and it has no awareness of certificates at all — it's still subscription-only.

**Fix:** add a `type?: 'subscription' | 'certificate'` and `certificateId?: string` to `PaymentScreen`'s route params in `navigation.types.ts`, and branch the checkout-session call accordingly:

```ts
const { type = 'subscription', certificateId, amountMad } = route.params ?? {};

const startCheckout = async () => {
  if (type === 'certificate' && certificateId) {
    const session = await paymentEndpoints.createCheckoutSession({
      type: 'certificate',
      certificateId,
      amountMad,
    });
    setCheckoutUrl(session.url);
  } else {
    // existing subscription flow
  }
};
```

On the backend, `payment.service.ts`'s checkout-session creator needs the same branch — when `type === 'certificate'`, create the `Payment` row with `type: 'certificate'` and set `certificateId` via the relation you already added to the schema, and the Stripe webhook handler needs to flip `Certificate.status` to `'paid'` and set `paidAt`/`paymentId` on success (this part wasn't in the diff at all — confirm it's not already there before adding it, since I didn't find a `certificate`-branch in `stripe.provider.ts`'s webhook handler).

### 2.4 Two dead buttons reintroduced in the new screens

Same pattern as before, in the code you just added:

| File | Line | What's wrong |
|---|---|---|
| `courses/screens/SavedCoursesScreen.tsx` | 44 | `<Pressable onPress={() => {}}>` wrapping each saved-course row — tapping a saved course does nothing. Should navigate to `CourseScreen`. Also note: this screen renders `MOCK_SAVED`, a hardcoded array — there's no real backend call yet even though you already have a `Bookmark` model in the schema. You'll need a `GET /api/v1/users/me/bookmarks` (or similar) endpoint and a `useSavedCourses()` hook to replace the mock. |
| `courses/screens/CourseCompleteScreen.tsx` | 71 | The "Partager ma réussite" button is `onPress={() => {}}`. Same fix as `handleShare` above — wire it to React Native's `Share.share()`. |

### 2.5 `CourseReviewsScreen` has no backend behind it

The screen you built is good UI, but it renders `MOCK_REVIEWS`, a hardcoded array — there is no `CourseReview` (or similarly named) model in `schema.prisma` at all yet, and no endpoint. This was flagged as an idea in the previous roadmap doc (§4, item 2) and you've built the front-end shell for it, but the backend piece is still needed:

```prisma
model CourseReview {
  id        String   @id @default(uuid()) @db.Uuid
  courseId  String   @db.Uuid
  userId    String   @db.Uuid
  rating    Int      // 1-5
  comment   String?
  createdAt DateTime @default(now())

  course Course @relation(fields: [courseId], references: [id])
  user   User   @relation(fields: [userId], references: [id])

  @@unique([userId, courseId])
  @@index([courseId])
  @@map("CourseReview")
}
```
Plus a small `review.controller.ts`/`review.service.ts` (list reviews for a course, create/update a review — probably gate creation on `getCourseCompletionStatus().isComplete` so only people who actually finished the course can review it, which also doubles as review-quality/anti-spam control) and a `useCourseReviews(courseId)` hook to replace `MOCK_REVIEWS` in the screen.

### 2.6 Verify the Stripe webhook actually reacts to certificate payments

I didn't find any certificate-specific branch inside the payment webhook handler (`payment.controller.ts`/`stripe.provider.ts`). Once §2.3 is done, double check that the webhook's success handler does something like:

```ts
if (payment.type === 'certificate' && payment.certificateId) {
  await prisma.certificate.update({
    where: { id: payment.certificateId },
    data: { status: 'paid', paidAt: new Date(), paymentId: payment.id },
  });
}
```
Without this, a user could pay successfully and their certificate would still show as `unlocked` (unpaid) instead of `paid`.

---

## 3. Smaller things worth tightening

1. **`GET` for `/certificates/:id/checkout`.** This endpoint creates state (a pending payment intent conceptually), so REST convention says it should be a `POST`. Not urgent, but worth fixing before this goes to production since GET requests are assumed idempotent/side-effect-free by caches, proxies, and retry logic.
2. **Only "Fondamentaux de React" was spot-checked in depth** — before you consider content "done," skim at least one lesson from each of the other 15 courses to confirm the same quality bar holds (I have no reason to think it doesn't, given the shared `types.ts` structure, but it's worth a manual pass since this content is what learners will actually pay for).
3. **New test files exist but I didn't verify they pass.** `courseService.test.ts`, `exerciseService.test.ts`, `projectService.test.ts`, `jwtUtil.test.ts` were added — run `npm run test` and `npm run typecheck` in `deveduforge-backend` to confirm they're green before merging, especially since the config/middleware/utils reorganization (§1) means a lot of import paths changed at once, which is a classic place for a stray broken import to hide.
4. **CI workflow exists — confirm it actually gates merges.** Check that `ci.yml` runs on `pull_request` (not just `push`) and that branch protection on your main branch requires it to pass, otherwise the workflow existing doesn't actually stop a broken PR from merging.

---

## 4. Suggested order for this pass

1. Wire `checkAndUnlockCertificate()` into the three completion points (§2.1) — nothing else in the certificate flow matters until this runs.
2. Replace the four `Alert.alert` stubs in `CertificateDetailScreen` with real handlers (§2.2), extend `PaymentScreen` for certificate purchases (§2.3), and confirm the webhook marks certificates `paid` (§2.6). At that point the full "locked → complete course → unlock → pay → download" loop you originally asked for will work end to end.
3. Fix the two new dead buttons and replace `SavedCoursesScreen`'s mock data with a real bookmarks endpoint (§2.4).
4. Add the `CourseReview` model + endpoints to back the reviews screen you already built (§2.5).
5. Run the test suite and confirm CI gates merges (§3.3–3.4) before considering this release-ready.