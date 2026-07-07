// ponytail: minimal .env loader, replaces the dotenv dependency
const fs = require('fs');

try {
  const env = fs.readFileSync('.env', 'utf8');
  for (const line of env.split('\n')) {
    const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2];
  }
} catch {}
