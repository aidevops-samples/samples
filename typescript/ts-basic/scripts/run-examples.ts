// examples/*.ts를 모두 실행합니다 (CI에서 사용). — npm run examples
import { readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const files = readdirSync('examples').filter(f => f.endsWith('.ts')).sort();
let failed = 0;

for (const file of files) {
  console.log(`== examples/${file}`);
  const run = spawnSync(process.execPath, [`examples/${file}`], { stdio: 'inherit' });
  if (run.status !== 0) failed += 1;
}

if (failed > 0) {
  console.error(`${failed}개 예제가 실패했습니다`);
  process.exit(1);
}
