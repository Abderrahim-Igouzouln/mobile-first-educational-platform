import { readFileSync, writeFileSync } from 'fs';

const pkgPath = new URL('../node_modules/lucide-react-native/package.json', import.meta.url);
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));

let changed = false;
const CJS = './dist/cjs/lucide-react-native.js';
const CJS_ICONS = './dist/cjs/icons/index.js';
const CJS_ICONS_WILDCARD = './dist/cjs/icons/*.js';

function fixExports(entry) {
  const conds = pkg.exports?.[entry];
  if (!conds) return;
  const cjsTarget = entry === '.' ? CJS : entry === './icons' ? CJS_ICONS : CJS_ICONS_WILDCARD;
  for (const key of Object.keys(conds)) {
    if (conds[key]?.includes('/esm/')) {
      conds[key] = cjsTarget;
      changed = true;
    }
  }
}

if (pkg.exports) {
  for (const entry of Object.keys(pkg.exports)) {
    fixExports(entry);
  }
}

for (const field of ['react-native', 'module', 'main']) {
  if (pkg[field]?.includes('/esm/')) {
    pkg[field] = CJS;
    changed = true;
  }
}

if (changed) {
  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
  console.log('Patched lucide-react-native for CJS compatibility');
}
