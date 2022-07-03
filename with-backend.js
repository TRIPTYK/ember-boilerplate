/* eslint-disable no-process-exit */
/* eslint-disable no-console */
const [, , command] = process.argv;
const child_process = require('child_process');

const launchBackend = child_process.spawn('pnpm -C ../backend start:test:ci', {
  stdio: ['inherit', 'pipe', 'inherit'],
  env: process.env,
  shell: true,
  detached: true,
});

launchBackend.stdout.pipe(process.stdout);
launchBackend.on('close', () => {
  if (launchBackend.exitCode !== null) {
    process.exit(launchBackend.exitCode);
  }
});

launchBackend.stdout.on('data', (data) => {
  if (data.toString().includes('Listening on port')) {
    console.log(`backend launched, doing ${command}`);
    const exec = child_process.spawn(command, {
      stdio: ['inherit', 'inherit', 'inherit'],
      env: process.env,
      shell: true,
      detached: true,
    });
    exec.on('close', () => {
      process.kill(-launchBackend.pid);
      if (exec.exitCode !== null) {
        process.exit(exec.exitCode);
      }
    });
  }
});
