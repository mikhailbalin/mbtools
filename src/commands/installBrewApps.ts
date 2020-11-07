import { ListrTaskWrapper } from 'listr';
import execa from 'execa';
import keys from 'lodash/keys';
import pickBy from 'lodash/pickBy';
import cloneDeep from 'lodash/cloneDeep';
import isObject from 'lodash/isObject';
import { TBrew, TContext } from '../types';
import { setFishConfig } from './installFish';

export async function installBrewApps(
  ctx: TContext,
  task: ListrTaskWrapper,
  options: TBrew,
) {
  try {
    const truthyOptions = pickBy(options);
    const appsToInstall = keys(truthyOptions);

    task.output = 'Updating Brew...';
    await execa.command('brew update', { shell: 'fish' });

    task.output = 'Installing Brew apps...';
    await execa.command(`brew install ${appsToInstall.join(' ')}`, {
      shell: 'fish',
    });

    if (appsToInstall.includes('yarn')) {
      const ctxClone = cloneDeep(ctx);

      if (isObject(ctxClone.brew)) {
        ctxClone.brew = { ...ctxClone.brew, ...truthyOptions };
      } else {
        ctxClone.brew = options;
      }

      setFishConfig('config', ctxClone);
    }

    if (isObject(ctx.brew)) {
      ctx.brew = { ...ctx.brew, ...truthyOptions };
    } else {
      ctx.brew = options;
    }
  } catch (error) {
    task.skip(error.message);
  }
}
