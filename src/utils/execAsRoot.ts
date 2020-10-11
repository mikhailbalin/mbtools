import { spawn } from 'child_process';

const execAsRoot = (command: string, password: string) => {
  return new Promise<string>((resolve, reject) => {
    const superuserCommand = spawn(`sudo -S ${command}`, {
      shell: true,
    });

    superuserCommand.stdout.on('data', (data) => {
      console.log(`child stdout:\n${data}`);
    });

    superuserCommand.stderr.on('data', (data: Buffer) => {
      const chunk = data.toString('utf8');
      console.log(`child stderr:\n${chunk}`);

      if (
        chunk.includes('password for') ||
        chunk.includes('Sorry, try again')
      ) {
        superuserCommand.stdin.write(`${password}\n`, (error) => {
          if (error) {
            reject(new Error(`execAsRoot write error: ${error.message}`));
          }
        });
      }

      if (chunk.includes('incorrect password attempts')) {
        reject(new Error(`execAsRoot stderr: ${chunk}`));
      }
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
