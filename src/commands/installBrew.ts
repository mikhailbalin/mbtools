import execa from 'execa';
import os from 'os';
import path from 'path';
import { ListrTaskWrapper } from 'listr';
import { TContext } from '../types';
import { execAsRoot } from '../utils';
import { setFishConfig } from './installFish';

export async function installBrew(
  ctx: TContext,
  task: ListrTaskWrapper,
  password: string,
) {
  const linuxbrewDir = path.join(os.homedir(), '.linuxbrew');
  const homebrewDir = path.join(linuxbrewDir, 'Homebrew');
  const binDir = path.join(linuxbrewDir, 'bin');

  try {
    task.output = 'Installing dependencies...';
    await execAsRoot('apt-get install build-essential -y', password);

    task.output = 'Clonning repo...';
    await execa.command(
      `git clone https://github.com/Homebrew/brew ${homebrewDir}`,
    );

    task.output = 'Setting up...';
    await execa.command(`mkdir ${binDir}`);
    await execa.command(
      `ln -s ${path.join(homebrewDir, 'bin', 'brew')} ${binDir}`,
    );

    setFishConfig('config', { ...ctx, brew: true });

    ctx.brew = true;
  } catch (error) {
    task.skip(error.message);
  }
}
