import execa from 'execa';
import os from 'os';
import { ListrTaskWrapper } from 'listr';
import { TContext } from '../types';
import { execAsRoot } from '../utils';
import { setFishConfig } from './installFish';

export async function installBrew(
  ctx: TContext,
  task: ListrTaskWrapper,
  password: string,
) {
  try {
    await execAsRoot('apt-get install build-essential -y', password);
    await execa.command(
      `git clone https://github.com/Homebrew/brew ${os.homedir()}/.linuxbrew/Homebrew`,
    );
    await execa.command(`mkdir ${os.homedir()}/.linuxbrew/bin`);
    await execa.command(
      `ln -s ${os.homedir()}/.linuxbrew/Homebrew/bin/brew ${os.homedir()}/.linuxbrew/bin`,
    );

    setFishConfig('config', { ...ctx, brew: true });

    ctx.brew = true;
  } catch {
    task.skip('Brew install error');
  }
}
