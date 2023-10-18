const [, , backendCommand, frontendCommand] = process.argv;
const child_process = require('child_process');

const launchBackend = child_process.spawn(backendCommand, {
  stdio: ['inherit', 'pipe', 'inherit'],
  env: process.env,
  shell: true,
  detached: true,
});

launchBackend.stdout.pipe(process.stdout);
launchBackend.on('close', () => {
  if (launchBackend.exitCode !== null) {
    // eslint-disable-next-line n/no-process-exit
    process.exit(launchBackend.exitCode);
  }
});

launchBackend.stdout.on('data', (data) => {
  if (data.toString().includes('Listening on port')) {
    // eslint-disable-next-line no-console
    console.log(`backend launched, doing ${frontendCommand}`);

    const exec = child_process.spawn(frontendCommand, {
      stdio: ['inherit', 'inherit', 'inherit'],
      env: process.env,
      shell: true,
      detached: true,
    });

    exec.on('close', () => {
      process.kill(-launchBackend.pid);

      if (exec.exitCode !== null) {
        // eslint-disable-next-line n/no-process-exit
        process.exit(exec.exitCode);
      }
    });
  }
});
