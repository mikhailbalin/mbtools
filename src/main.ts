import Listr, { ListrTaskWrapper } from 'listr';
import isBoolean from 'lodash/isBoolean';
import isObject from 'lodash/isObject';
import {
  updateSystem,
  configureGit,
  installFish,
  configureSSH,
  installBrew,
  configureFish,
  installBrewApps,
  installYarnApps,
} from './commands';
import type { TBrew, TCombinedContext, TContext, TYarn } from './types';
import {
  NOTHING_HAPPENED,
  EVERYTHING_READY,
  SOMETHING_BROKE,
  options,
  status,
} from './constants';
import { config } from './config';

const { UPDATE, GIT, FISH, SSH, BREW } = options;

const none = <T>(arr: T[], fn = Boolean) => !arr.some(fn);

export async function setupSystem(options: TCombinedContext) {
  const { password, ...rest } = options;

  if (none(Object.values(rest))) {
    console.info(NOTHING_HAPPENED);
    return;
  }

  const tasks = new Listr([
    {
      title: UPDATE.desc,
      task: (_, task: ListrTaskWrapper) => updateSystem(task, password!),
      enabled: () => options.update,
    },
    {
      title: GIT.desc,
      task: (ctx: TContext, task: ListrTaskWrapper) => configureGit(ctx, task),
      enabled: () => options.git,
      skip: (ctx: TContext) => ctx.git && 'Git already configured',
    },
    {
      title: FISH.desc,
      task: (ctx: TContext) =>
        new Listr(
          [
            {
              title: 'Install',
              task: (_, task: ListrTaskWrapper) =>
                installFish(ctx, task, password!),
              skip: () => ctx.fish && 'Fish already installed',
            },
            {
              title: 'Configure',
              task: (_, task: ListrTaskWrapper) =>
                configureFish(ctx, task, password!),
            },
          ],
          { concurrent: true },
        ),
      enabled: () => options.fish,
    },
    {
      title: SSH.desc,
      task: (ctx: TContext, task: ListrTaskWrapper) => configureSSH(ctx, task),
      enabled: () => options.ssh,
      skip: (ctx: TContext) => {
        if (!ctx.fish) return 'Fish should be installed';
        if (!process.env.DROPBOX_ACCESS_TOKEN)
          return 'DROPBOX_ACCESS_TOKEN is not provided, please get it here https://www.dropbox.com/developers/apps';
        if (ctx.ssh) return 'SSH already configured';
      },
    },
    {
      title: BREW.desc,
      task: (ctx: TContext) =>
        new Listr([
          {
            title: 'Install Brew',
            task: (_, task: ListrTaskWrapper) =>
              installBrew(ctx, task, password!),
            skip: () => !!ctx.brew && 'Brew already installed',
          },
          {
            title: 'Install Brew Apps',
            task: (_, task: ListrTaskWrapper) =>
              installBrewApps(ctx, task, options.brew as TBrew),
            skip: () => {
              if (!ctx.brew) return "Brew isn't installed";
              if (isBoolean(options.brew)) return 'Nothing selected to install';
            },
          },
          {
            title: 'Install Yarn Apps',
            task: (_, task: ListrTaskWrapper) =>
              installYarnApps(ctx, task, (options.brew as TBrew).yarn as TYarn),
            skip: () => {
              if (!ctx.brew) return "Brew isn't installed";
              if (isObject(ctx.brew) && !ctx.brew.yarn)
                return "Yarn isn't installed";
              if (isObject(options.brew) && isBoolean(options.brew.yarn))
                return 'Nothing selected to install';
            },
          },
        ]),
      enabled: () => !!options.brew,
      skip: (ctx: TContext) => {
        if (!ctx.fish) return 'Fish should be installed';
      },
    },
  ]);

  try {
    const ctx = await tasks.run(config.all);
    config.all = ctx;
    console.info(`\n${EVERYTHING_READY}`);
  } catch (error) {
    if (error.message) {
      console.error(`\n${status.ERROR} ${error.message}`);
    } else {
      console.error(`\n${SOMETHING_BROKE}`);
    }
  }
}
