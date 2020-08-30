import execa from 'execa';

const checkInstalled = async (command: string) => {
  const result = await execa.command(command);
  return result.exitCode === 0;
};

export default checkInstalled;
