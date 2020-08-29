import Listr from 'listr';
import {
  updateSystem,
  configureGit,
  installFish,
  configureSSH,
} from './commands';
import { TOptions } from './utils/parseArgumentsIntoOptions';
import { EVERYTHING_READY, NOTHING_HAPPENED } from './constants';

const none = <T>(arr: T[], fn = Boolean) => !arr.some(fn);

export async function createProject(options: Omit<TOptions, 'skipPrompts'>) {
  if (none(Object.values(options))) {
    console.info(NOTHING_HAPPENED);
    return;
  }

  const tasks = new Listr([
    {
      title: 'System update',
      task: () => updateSystem(options),
      enabled: () => options.update,
    },
    {
      title: 'Initialize git',
      task: () => configureGit(),
      enabled: () => options.git,
    },
    {
      title: 'Configure fish',
      task: (ctx, task: Listr.ListrTaskWrapper<any>) =>
        installFish(task, options),
      enabled: () => options.fish,
    },
    {
      title: 'Configure SSH',
      task: () => configureSSH(),
      enabled: () => options.ssh,
    },
  ]);

  await tasks.run();

  console.info(EVERYTHING_READY);
  return true;
}
