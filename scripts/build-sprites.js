import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const LPC_DIR = path.join(__dirname, '..', 'tools', 'lpc');
const OUT_DIR = path.join(__dirname, '..', 'assets', 'characters', 'layers');

const jobs = [
  // Corpo – todas as variações em um único atlas
  { file: 'body.png',  args: '--sex=sex.male,sex.female --skin=skin.light,skin.amber,skin.olive,skin.taupe'  },

  // Robe “Aprendiz”
  { file: 'robes.png',   args: '--robes=robes.apprentice.green' },

  // Armadura “Leather Vest”
  { file: 'armors.png',  args: '--armors=armors.leather_vest'  },

  // Espada curta
  { file: 'weapons.png', args: '--weapons=weapons.short_sword' },

  // FX halo
  { file: 'fx.png',      args: '--fx=fx.halo' }
];

const CLI = 'node cli.js';

for (const job of jobs) {
  const dst = path.join(OUT_DIR, job.file);
  const cmd = `${CLI} --file=${dst} ${job.args} --body=body.normal --format=strip`;
  console.log('Gerando:', dst);
  execSync(cmd, { stdio: 'inherit', cwd: LPC_DIR });
}
