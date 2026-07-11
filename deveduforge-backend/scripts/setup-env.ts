/**
 * Environment validation script for DevEduForge backend.
 *
 * Usage:
 *   npx ts-node scripts/setup-env.ts
 *
 * Checks all required & optional keys in .env / process.env
 * and prints a clear report of what's missing or misconfigured.
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { config } from 'dotenv';

// Load .env if present
const envPath = join(__dirname, '..', '.env');
if (existsSync(envPath)) {
  config({ path: envPath });
  console.log('✅ .env file loaded');
} else {
  console.log('⚠️  No .env file found at', envPath);
  console.log('   Create one by copying `.env.example`');
}

interface EnvRule {
  key: string;
  required: boolean;
  minLength?: number;
  description: string;
}

const rules: EnvRule[] = [
  // Database
  { key: 'DATABASE_URL', required: true, description: 'PostgreSQL connection string (Supabase pooler)' },
  { key: 'DIRECT_URL', required: false, description: 'Direct DB connection (for migrations)' },

  // JWT
  { key: 'JWT_ACCESS_SECRET', required: true, minLength: 32, description: 'Access token signing secret (≥32 bytes)' },
  { key: 'JWT_REFRESH_SECRET', required: true, minLength: 32, description: 'Refresh token signing secret (≥32 bytes)' },
  { key: 'JWT_ALGORITHM', required: false, description: 'Signing algorithm (HS256 | RS256, default HS256)' },

  // Storage (optional but warned)
  { key: 'STORAGE_BUCKET', required: false, description: 'S3/MinIO bucket for file uploads' },
  { key: 'STORAGE_ENDPOINT', required: false, description: 'S3/MinIO endpoint URL' },
  { key: 'STORAGE_ACCESS_KEY', required: false, description: 'S3/MinIO access key' },
  { key: 'STORAGE_SECRET_KEY', required: false, description: 'S3/MinIO secret key' },
  { key: 'STORAGE_REGION', required: false, description: 'S3/MinIO region' },

  // SMTP (optional but warned)
  { key: 'SMTP_HOST', required: false, description: 'SMTP server host' },
  { key: 'SMTP_PORT', required: false, description: 'SMTP server port (default 587)' },
  { key: 'SMTP_USER', required: false, description: 'SMTP username' },
  { key: 'SMTP_PASS', required: false, description: 'SMTP password' },
  { key: 'SMTP_FROM', required: false, description: 'From address for outgoing emails' },

  // Stripe (optional but warned)
  { key: 'STRIPE_SECRET_KEY', required: false, description: 'Stripe secret key (sk_live / sk_test)' },
  { key: 'STRIPE_WEBHOOK_SECRET', required: false, description: 'Stripe webhook signing secret' },
  { key: 'STRIPE_PREMIUM_PRICE_ID', required: false, description: 'Stripe Price ID for premium subscription' },

  // Firebase Cloud Messaging (optional but warned)
  { key: 'FCM_SERVER_KEY', required: false, description: 'Firebase Cloud Messaging server key' },
  { key: 'FCM_PROJECT_ID', required: false, description: 'Firebase project ID' },

  // App
  { key: 'NODE_ENV', required: false, description: 'Environment (development|production|test)' },
  { key: 'PORT', required: false, description: 'HTTP server port (default 4000)' },
  { key: 'CORS_ORIGIN', required: false, description: 'Allowed CORS origin (default *)' },
  { key: 'REDIS_URL', required: false, description: 'Redis connection string (optional)' },
];

function check() {
  let success = true;
  const warnings: string[] = [];

  console.log('\n🔍 Environment validation\n');

  for (const rule of rules) {
    const value = process.env[rule.key];
    const isSet = !!value && value.length > 0;

    if (rule.required) {
      if (!isSet) {
        console.log(`❌ MISSING  ${rule.key.padEnd(25)} — ${rule.description}`);
        success = false;
      } else if (rule.minLength && value!.length < rule.minLength) {
        console.log(`❌ TOO SHORT ${rule.key.padEnd(25)} — ${value!.length}/${rule.minLength} bytes (min ${rule.minLength})`);
        success = false;
      } else {
        console.log(`✅ OK       ${rule.key.padEnd(25)} — ${value!.substring(0, 6)}...`);
      }
    } else {
      if (!isSet) {
        warnings.push(rule.key);
      } else {
        console.log(`✅ OK       ${rule.key.padEnd(25)} — ${value!.substring(0, 6)}...`);
      }
    }
  }

  if (warnings.length > 0) {
    console.log(`\n⚠️  Optional keys not set (${warnings.length}):`);
    for (const key of warnings) {
      const rule = rules.find((r) => r.key === key)!;
      console.log(`   - ${key} — ${rule.description}`);
    }
  }

  console.log('\n---');

  if (!success) {
    console.log('\n❌ Required environment variables are missing or invalid.');
    console.log('   Fix the issues above, then re-run this script.');
    process.exit(1);
  } else {
    console.log('\n✅ All required environment variables are configured.');
  }
}

check();
