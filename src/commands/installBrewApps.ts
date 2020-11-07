import { ListrTaskWrapper } from 'listr';
import execa from 'execa';
import keys from 'lodash/keys';
import pickBy from 'lodash/pickBy';
import { TBrew, TContext } from '../types';

export async function installBrewApps(
  ctx: TContext,
  task: ListrTaskWrapper,
  options: TBrew,
) {
  try {
    task.output = 'Installing Brew apps...';

    const appsToInstall = keys(pickBy(options));

    await execa.command('brew update', { shell: 'fish' });
    await execa.command(`brew install ${appsToInstall}`, { shell: 'fish' });

    ctx.brew = options;
  } catch (error) {
    task.skip(error.message);
  }
}
