import { PrismaClient, QuestionType, Level, Role } from '@prisma/client';
import bcrypt from 'bcrypt';
import { ALL_COURSE_CONTENT } from './content';
import type { CourseContent } from './content';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...\n');

  // ── Plans ──────────────────────────────────────────────────────────
  const plans = [
    { code: 'FREE', name: 'Gratuit', priceMad: 0, billingInterval: 'none' as const, features: JSON.stringify({ maxCourses: 3, maxExercises: 10, maxProjects: 1, certificates: false, premiumSupport: false }), isActive: true },
    { code: 'PREMIUM', name: 'Premium', priceMad: 49, billingInterval: 'monthly' as const, features: JSON.stringify({ maxCourses: -1, maxExercises: -1, maxProjects: 5, certificates: true, premiumSupport: false }), isActive: true },
    { code: 'PREMIUM_PLUS', name: 'Premium+', priceMad: 99, billingInterval: 'monthly' as const, features: JSON.stringify({ maxCourses: -1, maxExercises: -1, maxProjects: -1, certificates: true, premiumSupport: true }), isActive: true },
  ];
  for (const plan of plans) {
    await prisma.subscriptionPlan.upsert({ where: { code: plan.code }, update: plan, create: plan });
  }
  console.log('✔ Plans (3)');

  // ── Users ──────────────────────────────────────────────────────────
  const passwordHash = await bcrypt.hash('DevEduForge2026!', 12);
  const userData = [
    { email: 'admin@deveduforge.com', firstName: 'Admin', lastName: 'DevEduForge', role: Role.superadmin },
    { email: 'instructor@deveduforge.com', firstName: 'Jean', lastName: 'Dupont', role: Role.instructor },
    { email: 'student@deveduforge.com', firstName: 'Marie', lastName: 'Martin', role: Role.student },
    { email: 'premiumplus@deveduforge.com', firstName: 'Ahmed', lastName: 'Alaoui', role: Role.student },
  ];
  const userIds: Record<string, string> = {};
  for (const u of userData) {
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: { ...u, passwordHash, emailVerifiedAt: new Date() },
    });
    userIds[u.email] = user.id;
  }
  console.log('✔ Users (4)');

  // ── Domains ────────────────────────────────────────────────────────
  const domains = [
    { slug: 'frontend', name: 'Développement Frontend', description: 'Créez des interfaces utilisateur modernes et réactives', icon: 'Layout', colorTheme: '#1565C0', order: 1 },
    { slug: 'backend', name: 'Développement Backend', description: 'Maîtrisez la logique serveur et les API', icon: 'Server', colorTheme: '#2E7D32', order: 2 },
    { slug: 'mobile', name: 'Développement Mobile', description: 'Développez des applications iOS et Android', icon: 'Smartphone', colorTheme: '#E65100', order: 3 },
    { slug: 'devops', name: 'DevOps & Cloud', description: 'Automatisez, déployez et gérez l\'infrastructure', icon: 'Cloud', colorTheme: '#7B1FA2', order: 4 },
  ];
  const domainIds: Record<string, string> = {};
  for (const d of domains) {
    const domain = await prisma.domain.upsert({ where: { slug: d.slug }, update: d, create: d });
    domainIds[d.slug] = domain.id;
  }
  console.log('✔ Domains (4)');

  // ── Technologies ───────────────────────────────────────────────────
  const techs = [
    { slug: 'react', name: 'React', domainSlug: 'frontend', description: 'Bibliothèque JavaScript pour construire des interfaces utilisateur', icon: 'Code2', order: 1, isPremiumOnly: false },
    { slug: 'vuejs', name: 'Vue.js', domainSlug: 'frontend', description: 'Framework progressif pour construire des interfaces modernes', icon: 'Code2', order: 2, isPremiumOnly: false },
    { slug: 'nodejs', name: 'Node.js', domainSlug: 'backend', description: 'Environnement d\'exécution JavaScript côté serveur', icon: 'FileJson', order: 1, isPremiumOnly: false },
    { slug: 'python', name: 'Python', domainSlug: 'backend', description: 'Langage polyvalent pour le backend et la data science', icon: 'Terminal', order: 2, isPremiumOnly: false },
    { slug: 'react-native', name: 'React Native', domainSlug: 'mobile', description: 'Framework pour applications mobiles cross-platform', icon: 'Smartphone', order: 1, isPremiumOnly: true },
    { slug: 'flutter', name: 'Flutter', domainSlug: 'mobile', description: 'SDK pour applications mobiles natives', icon: 'Smartphone', order: 2, isPremiumOnly: true },
    { slug: 'docker', name: 'Docker', domainSlug: 'devops', description: 'Plateforme de conteneurisation', icon: 'Container', order: 1, isPremiumOnly: false },
    { slug: 'aws', name: 'AWS', domainSlug: 'devops', description: 'Services Cloud Amazon', icon: 'Cloud', order: 2, isPremiumOnly: false },
  ];
  const techIds: Record<string, string> = {};
  for (const t of techs) {
    const tech = await prisma.technology.upsert({
      where: { slug: t.slug },
      update: { domainId: domainIds[t.domainSlug], name: t.name, description: t.description, icon: t.icon, order: t.order, isPremiumOnly: t.isPremiumOnly },
      create: { slug: t.slug, name: t.name, domainId: domainIds[t.domainSlug], description: t.description, icon: t.icon, order: t.order, isPremiumOnly: t.isPremiumOnly },
    });
    techIds[t.slug] = tech.id;
  }
  console.log('✔ Technologies (8)');

  // ── Courses (skip if already fully seeded) ─────────────────────────
  const existingCourseCount = await prisma.course.count();
  const existingLessonCount = await prisma.lesson.count();
  if (existingCourseCount > 0 && existingLessonCount > 0) {
    console.log('→ Courses already seeded, skipping content seed');
    console.log('\n✅ Seed completed successfully!');
    return;
  }
  if (existingCourseCount > 0) {
    console.log('→ Courses exist but content incomplete, re-seeding...');
    await prisma.project.deleteMany();
    await prisma.answerOption.deleteMany();
    await prisma.question.deleteMany();
    await prisma.exercise.deleteMany();
    await prisma.lesson.deleteMany();
    await prisma.course.deleteMany();
  }

  interface CourseDef { techSlug: string; title: string; description: string; level: Level; durationMin: number }
  const courseDefs: CourseDef[] = [
    { techSlug: 'react', title: 'Fondamentaux de React', description: 'Apprenez les bases de React : JSX, composants, props, state', level: Level.beginner, durationMin: 180 },
    { techSlug: 'react', title: 'React Avancé', description: 'Hooks, context, performance et patterns avancés', level: Level.advanced, durationMin: 240 },
    { techSlug: 'vuejs', title: 'Introduction à Vue.js 3', description: 'Découvrez Vue.js et le Composition API', level: Level.beginner, durationMin: 150 },
    { techSlug: 'vuejs', title: 'Vue.js Avancé avec Pinia', description: 'State management, routing et applications complexes', level: Level.intermediate, durationMin: 200 },
    { techSlug: 'nodejs', title: 'Node.js par la pratique', description: 'Créez des API REST avec Express et TypeScript', level: Level.beginner, durationMin: 210 },
    { techSlug: 'nodejs', title: 'Node.js : Microservices', description: 'Architecture microservices avec message brokers', level: Level.advanced, durationMin: 300 },
    { techSlug: 'python', title: 'Python pour le Backend', description: 'API REST avec FastAPI et PostgreSQL', level: Level.beginner, durationMin: 180 },
    { techSlug: 'python', title: 'Python Data Science', description: 'Pandas, NumPy et visualisation de données', level: Level.intermediate, durationMin: 240 },
    { techSlug: 'react-native', title: 'React Native Foundation', description: 'Construisez votre première app mobile cross-platform', level: Level.beginner, durationMin: 270 },
    { techSlug: 'react-native', title: 'React Native Avancé', description: 'Animations, performance et déploiement', level: Level.advanced, durationMin: 300 },
    { techSlug: 'flutter', title: 'Flutter pour débutants', description: 'Widgets, layouts et navigation avec Dart', level: Level.beginner, durationMin: 240 },
    { techSlug: 'flutter', title: 'Flutter : Applications complexes', description: 'State management, Firebase et CI/CD', level: Level.intermediate, durationMin: 300 },
    { techSlug: 'docker', title: 'Docker Essentials', description: 'Conteneurisation, Dockerfile, Compose', level: Level.beginner, durationMin: 150 },
    { techSlug: 'docker', title: 'Docker en Production', description: 'Orchestration avec Swarm, monitoring, sécurité', level: Level.advanced, durationMin: 240 },
    { techSlug: 'aws', title: 'AWS Cloud Practitioner', description: 'Préparez la certification Cloud Practitioner', level: Level.beginner, durationMin: 360 },
    { techSlug: 'aws', title: 'AWS Solutions Architect', description: 'Architecture cloud avancée et bonnes pratiques', level: Level.advanced, durationMin: 480 },
  ];

  const courseIds: Array<{ id: string; techSlug: string; title: string }> = [];
  const instructorId = userIds['instructor@deveduforge.com'];
  for (const cd of courseDefs) {
    const course = await prisma.course.create({
      data: {
        technologyId: techIds[cd.techSlug],
        title: cd.title,
        description: cd.description,
        level: cd.level,
        estimatedDurationMin: cd.durationMin,
        isPublished: true,
        authorId: instructorId,
      },
    });
    courseIds.push({ id: course.id, techSlug: cd.techSlug, title: cd.title });
  }
  console.log(`✔ Courses (${courseIds.length})`);

  // ── Content-driven Lessons, Exercises & Projects ───────────────────
  let lessonCount = 0, exCount = 0, qCount = 0, optCount = 0, projectCount = 0;

  for (const courseEntry of courseIds) {
    const content: CourseContent | undefined = ALL_COURSE_CONTENT[courseEntry.title];
    const courseId = courseEntry.id;

    if (content) {
      // ── Real content from prisma/content/ ──
      for (let li = 0; li < content.lessons.length; li++) {
        const lessonDef = content.lessons[li];
        const lesson = await prisma.lesson.create({
          data: {
            courseId,
            title: lessonDef.title,
            contentMarkdown: lessonDef.contentMarkdown,
            order: li + 1,
            durationMin: lessonDef.durationMin,
            isPublished: true,
          },
        });
        lessonCount++;

        const exercise = await prisma.exercise.create({
          data: {
            lessonId: lesson.id,
            title: lessonDef.exercise.title,
            passingScorePercent: lessonDef.exercise.passingScorePercent,
          },
        });
        exCount++;

        for (let qi = 0; qi < lessonDef.exercise.questions.length; qi++) {
          const qDef = lessonDef.exercise.questions[qi];
          const question = await prisma.question.create({
            data: {
              exerciseId: exercise.id,
              type: QuestionType.mcq,
              prompt: qDef.prompt,
              explanation: qDef.explanation,
              order: qi + 1,
              points: qDef.points,
            },
          });
          qCount++;

          for (const optDef of qDef.options) {
            await prisma.answerOption.create({
              data: {
                questionId: question.id,
                label: optDef.label,
                isCorrect: optDef.isCorrect,
                order: optDef.order,
              },
            });
            optCount++;
          }
        }
      }

      await prisma.project.create({
        data: {
          courseId,
          title: content.project.title,
          instructions: content.project.instructions,
          evaluationCriteria: JSON.stringify(content.project.evaluationCriteria),
        },
      });
      projectCount++;
      console.log(`  ✅ "${content.title}" — ${content.lessons.length} leçons, ${content.lessons.length} exercices, 1 projet`);
    } else {
      // ── Fallback: placeholder content ──
      const fallbackTitles = ['Introduction', 'Concepts clés', 'Mise en pratique', 'Aller plus loin'];
      const fallbackMarkdown = `
## Objectifs
- Comprendre les concepts clés
- Savoir les appliquer
- Être capable de les reproduire

## Contenu
Cette leçon couvre les notions fondamentales avec des exemples pratiques.

\`\`\`typescript
const exemple = () => { console.log('Hello DevEduForge!'); };
\`\`\`

## Exercice
Créez un petit projet qui applique les concepts vus.

## Résumé
- Concept clé 1
- Concept clé 2
- Bonnes pratiques
      `.trim();

      for (let li = 0; li < 4; li++) {
        const lesson = await prisma.lesson.create({
          data: {
            courseId,
            title: fallbackTitles[li],
            contentMarkdown: `# ${fallbackTitles[li]}\n\n${fallbackMarkdown}`,
            order: li + 1,
            durationMin: 20 + li * 5,
            isPublished: true,
          },
        });
        lessonCount++;

        const exercise = await prisma.exercise.create({
          data: {
            lessonId: lesson.id,
            title: `Quiz - ${fallbackTitles[li]}`,
            passingScorePercent: 70,
          },
        });
        exCount++;

        for (let qi = 0; qi < 3; qi++) {
          const question = await prisma.question.create({
            data: {
              exerciseId: exercise.id,
              type: QuestionType.mcq,
              prompt: `Question ${qi + 1} : quelle est la bonne pratique ?`,
              explanation: 'La bonne réponse est l\'option A.',
              order: qi + 1,
              points: 1,
            },
          });
          qCount++;

          for (let oi = 0; oi < 4; oi++) {
            await prisma.answerOption.create({
              data: {
                questionId: question.id,
                label: `Option ${String.fromCharCode(65 + oi)}${oi === 0 ? ' : réponse correcte' : ' : réponse incorrecte'}`,
                isCorrect: oi === 0,
                order: oi,
              },
            });
            optCount++;
          }
        }
      }

      await prisma.project.create({
        data: {
          courseId,
          title: 'Projet pratique',
          instructions: '# Projet\n\nCréez une application complète mettant en œuvre les concepts du cours.',
          evaluationCriteria: JSON.stringify(['Qualité du code', 'Fonctionnalités', 'Tests', 'Documentation']),
        },
      });
      projectCount++;
      console.log(`  ⚠️  "${courseEntry.title}" — contenu générique (placeholder)`);
    }
  }
  console.log(`✔ Lessons (${lessonCount}), Exercises (${exCount}), Questions (${qCount}), Options (${optCount}), Projects (${projectCount})`);

  // ── Community Posts ────────────────────────────────────────────────
  const posts = [
    { title: 'Conseils pour débuter en React en 2026', content: 'Commencez par les fondamentaux, faites beaucoup de petits projets, et ne vous précipitez pas sur les hooks avancés.' },
    { title: 'API REST ou GraphQL pour un nouveau projet ?', content: 'Tout dépend de votre cas d\'usage. REST est plus simple, GraphQL plus flexible pour des données complexes.' },
    { title: 'Docker en production : retours d\'expérience', content: 'Utilisez des images légères, gérez bien les volumes, et mettez en place un monitoring dès le début.' },
  ];
  for (const p of posts) {
    const existing = await prisma.post.findFirst({ where: { title: p.title } });
    if (!existing) {
      await prisma.post.create({ data: { authorId: instructorId, title: p.title, content: p.content } });
    }
  }
  console.log('✔ Community posts (3)');

  // ── Streaks ────────────────────────────────────────────────────────
  for (const email of ['student@deveduforge.com', 'premiumplus@deveduforge.com']) {
    const existing = await prisma.streak.findUnique({ where: { userId: userIds[email] } });
    if (!existing) {
      await prisma.streak.create({
        data: {
          userId: userIds[email],
          currentStreak: email === 'premiumplus@deveduforge.com' ? 15 : 3,
          longestStreak: email === 'premiumplus@deveduforge.com' ? 30 : 7,
          lastActivityDate: new Date(),
        },
      });
    }
  }
  console.log('✔ Streaks (2)');

  console.log('\n✅ Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
