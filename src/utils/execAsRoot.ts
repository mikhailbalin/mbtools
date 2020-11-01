import execa from 'execa';

const execAsRoot = async (command: string, password: string) => {
  const superUserProcess = execa.command(`sudo -S ${command}`);

  superUserProcess.stderr?.on('data', (data) => {
    const chunk = data.toString('utf8');
    if (chunk.includes('password for')) {
      superUserProcess.stdin?.write(`${password}\n`);
    }

    if (
      chunk.includes('Sorry, try again') ||
      chunk.includes('incorrect password attempts')
    ) {
      superUserProcess.cancel();
    }
  });

  try {
    await superUserProcess;
  } catch (error) {
    throw new Error(error.shortMessage);
  }
};

export default execAsRoot;
