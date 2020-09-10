import execa from 'execa';

const execAsRoot = async (command: string, password: string) => {
  try {
    const result = await execa.command(`sudo -S ${command}`, {
      // input: `${password}\n`,
      // stdio: 'inherit',
    });

    console.log({ stdout: result.stdout });

    // (await result).stdin.write(`${password}\n`);

    if (result.failed) {
      return Promise.reject(new Error('Fail'));
    }

    return Promise.resolve('Cool');
  } catch (error) {
    console.error({ execAsRoot: error });
  }
};

export default execAsRoot;
