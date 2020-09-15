import { spawn } from 'child_process';

const execAsRoot = (command: string, password: string) => {
  return new Promise<string>((resolve, reject) => {
    const superuserCommand = spawn(`sudo -S ${command}`, {
      shell: true,
    });

    superuserCommand.stdin.write(`${password}\n`);

    superuserCommand.stderr.on('data', (data) => {
      if (data.includes('password for')) return;
      reject(new Error(`execAsRoot stderr: ${data}`));
    });

    superuserCommand.on('error', (error) => {
      reject(new Error(`execAsRoot error: ${error.message}`));
    });

    superuserCommand.on('close', (code) => {
      resolve(`execAsRoot resolved with code ${code}`);
    });
  });
};

export default execAsRoot;
