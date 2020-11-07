import { ListrTaskWrapper } from 'listr';
import execa from 'execa';
import isBoolean from 'lodash/isBoolean';
import keys from 'lodash/keys';
import pickBy from 'lodash/pickBy';
import { TContext, TYarn } from '../types';

export async function installYarnApps(
  ctx: TContext,
  task: ListrTaskWrapper,
  options: TYarn,
) {
  try {
    task.output = 'Installing Yarn apps...';

    const appsToInstall = keys(pickBy(options));

    await execa.command(`yarn global add ${appsToInstall}`, { shell: 'fish' });

    if (!isBoolean(ctx.brew) && ctx.brew.yarn) ctx.brew.yarn = options;
  } catch (error) {
    task.skip(error.message);
  }
}
