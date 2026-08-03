process.env.JWT_ACCESS_SECRET ??= 'test-access-secret-that-is-at-least-thirty-two-bytes1';
process.env.JWT_REFRESH_SECRET ??= 'test-refresh-secret-that-is-at-least-thirty-two-bytes';
process.env.DATABASE_URL ??= 'postgresql://postgres:postgres@localhost:5432/deveduforge_test';
process.env.NODE_ENV = 'test';
