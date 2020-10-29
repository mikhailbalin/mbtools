import execa from 'execa';

const checkInstalled = async (command: string) => {
  try {
    const result = await execa.command(command);
    return result.exitCode === 0;
  } catch {
    return false;
  }
};

export default checkInstalled;
