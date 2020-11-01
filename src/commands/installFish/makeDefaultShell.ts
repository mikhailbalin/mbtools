import execa from 'execa';

export const makeDefaultShell = async (password: string) => {
  const defaultShellProcess = execa.command('chsh -s /usr/bin/fish');

  defaultShellProcess.stderr?.on('data', (data) => {
    const chunk = data.toString('utf8');
    if (chunk.includes('Password')) {
      defaultShellProcess.stdin?.write(`${password}\n`);
    }
  });

  await defaultShellProcess;
};
