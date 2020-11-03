import execa from 'execa';

export const makeDefaultShell = async (password: string) => {
  try {
    const { stdout: fishExecPath } = await execa.command('which fish');
    const defaultShellProcess = execa.command(`chsh -s ${fishExecPath}`);

    defaultShellProcess.stderr?.on('data', (data) => {
      const chunk = data.toString('utf8');
      if (chunk.includes('Password')) {
        defaultShellProcess.stdin?.write(`${password}\n`);
      }
    });

    await defaultShellProcess;
  } catch (error) {
    throw new Error(error.shortMessage);
  }
};
