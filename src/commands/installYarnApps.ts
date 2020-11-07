import { ListrTaskWrapper } from 'listr';
import execa from 'execa';
import keys from 'lodash/keys';
import pickBy from 'lodash/pickBy';
import { TBrew, TContext, TYarn } from '../types';

export async function installYarnApps(
  ctx: TContext,
  task: ListrTaskWrapper,
  options: TYarn,
) {
  try {
    const appsToInstall = keys(pickBy(options));

    task.output = 'Installing Yarn apps...';
    await execa.command(`yarn global add ${appsToInstall.join(' ')}`, {
      shell: 'fish',
    });

    (ctx.brew as TBrew).yarn = options;
  } catch (error) {
    task.skip(error.message);
  }
}
