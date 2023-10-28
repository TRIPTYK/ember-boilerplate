const [, , beforeCommand, afterCommand, triggerText] = process.argv;
const child_process = require('child_process');

const launchBackend = child_process.spawn(beforeCommand, {
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

process.on('SIGINT', () => {
  process.kill(-launchBackend.pid);
});


launchBackend.stdout.on('data', (data) => {
  if (data.toString().includes(triggerText)) {
    // eslint-disable-next-line no-console
    console.log(`${beforeCommand} done, executing ${afterCommand}`);

    const exec = child_process.spawn(afterCommand, {
      stdio: ['inherit', 'inherit', 'inherit'],
      env: process.env,
      shell: true,
      detached: true,
    });

    process.on('SIGINT', () => {
      process.kill(-exec.pid);
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
