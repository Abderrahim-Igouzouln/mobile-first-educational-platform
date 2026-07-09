import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'DevEduForge API',
      version: '1.0.0',
      description: `API REST de la plateforme d'apprentissage DevEduForge.

## Authentification
La plupart des endpoints nécessitent un token JWT dans l'en-tête \`Authorization: Bearer <token>\`.
Obtenez-le via \`POST /api/v1/auth/login\`.

## Rôles
- **guest** (0) — accès public
- **student** (1) — apprenant inscrit
- **instructor** (2) — formateur
- **moderator** (3) — modérateur
- **admin** (4) — administrateur
- **superadmin** (5) — super-administrateur`,
    },
    servers: [
      { url: '/api/v1', description: 'API v1' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        ApiResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            data: { type: 'object' },
            meta: {
              type: 'object',
              properties: {
                page: { type: 'integer' },
                limit: { type: 'integer' },
                total: { type: 'integer' },
                totalPages: { type: 'integer' },
              },
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string' },
            code: { type: 'string' },
            details: { type: 'object' },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/modules/**/*.routes.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
