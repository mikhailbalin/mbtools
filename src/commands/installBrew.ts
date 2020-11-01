import execa from 'execa';
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
      'git clone https://github.com/Homebrew/brew ~/.linuxbrew/Homebrew',
    );
    await execa.command('mkdir ~/.linuxbrew/bin');
    await execa.command(
      'ln -s ~/.linuxbrew/Homebrew/bin/brew ~/.linuxbrew/bin',
    );

    setFishConfig('config', { ...ctx, brew: true });

    ctx.brew = true;
  } catch {
    task.skip('Brew install error');
  }
}
