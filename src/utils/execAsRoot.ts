import { spawn } from 'child_process';

const execAsRoot = (command: string, password: string) => {
  return new Promise<string>((resolve, reject) => {
    const child = spawn(`sudo -S ${command}`, {
      shell: true,
    });

    child.stdin.write(`${password}\n`);

    child.stderr.on('data', (data) => {
      if (data.includes('password for')) return;
      reject(new Error(`execAsRoot stderr: ${data}`));
    });

    child.on('error', (error) => {
      reject(new Error(`execAsRoot error: ${error.message}`));
    });

    child.on('close', (code) => {
      resolve(`execAsRoot resolved with code ${code}`);
    });
  });
};

export default execAsRoot;
