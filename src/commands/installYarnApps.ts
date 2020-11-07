import { ListrTaskWrapper } from 'listr';
import execa from 'execa';
import keys from 'lodash/keys';
import pickBy from 'lodash/pickBy';
import isObject from 'lodash/isObject';
import { TBrew, TContext, TYarn } from '../types';

export async function installYarnApps(
  ctx: TContext,
  task: ListrTaskWrapper,
  options: TYarn,
) {
  try {
    const truthyOptions = pickBy(options);
    const appsToInstall = keys(truthyOptions);

    task.output = 'Installing Yarn apps...';
    await execa.command(`yarn global add ${appsToInstall.join(' ')}`, {
      shell: 'fish',
    });

    if (isObject((ctx.brew as TBrew).yarn)) {
      (ctx.brew as TBrew).yarn = {
        ...((ctx.brew as TBrew).yarn as TYarn),
        ...truthyOptions,
      };
    } else {
      (ctx.brew as TBrew).yarn = options;
    }
  } catch (error) {
    task.skip(error.message);
  }
}
