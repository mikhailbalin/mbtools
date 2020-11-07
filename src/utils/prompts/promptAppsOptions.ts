import inquirer from 'inquirer';
import { config } from '../../config';
import { READY } from '../../constants';
import { TBrew } from '../../types';
import { promptYarnAppsOptions } from './promptYarnAppsOptions';

export const promptAppsOptions = async (): Promise<TBrew | boolean> => {
  const questions = [
    {
      type: 'checkbox',
      name: 'apps',
      message: 'What Brew apps would you like to install?',
      choices: [
        {
          name: 'Node',
          value: 'node',
          checked: !!config.get('brew.node'),
          disabled: config.get('brew.node') && READY,
        },
        {
          name: 'Yarn',
          value: 'yarn',
          checked: !!config.get('brew.yarn'),
          disabled: config.get('brew.yarn') && READY,
        },
        {
          name: 'PHP',
          value: 'php',
          checked: !!config.get('brew.php'),
          disabled: config.get('brew.php') && READY,
        },
        {
          name: 'ImageMagick',
          value: 'imagemagick',
          checked: !!config.get('brew.imagemagick'),
          disabled: config.get('brew.imagemagick') && READY,
        },
        {
          name: 'FFmpeg',
          value: 'ffmpeg',
          checked: !!config.get('brew.ffmpeg'),
          disabled: config.get('brew.ffmpeg') && READY,
        },
        {
          name: 'Azure CLI',
          value: 'azure-cli',
          checked: !!config.get("brew['azure-cli']"),
          disabled: config.get("brew['azure-cli']") && READY,
        },
        {
          name: 'Git LFS',
          value: 'git-lfs',
          checked: !!config.get("brew['git-lfs']"),
          disabled: config.get("brew['git-lfs']") && READY,
        },
        {
          name: 'Git Flow',
          value: 'git-flow-avh',
          checked: !!config.get("brew['git-flow-avh']"),
          disabled: config.get("brew['git-flow-avh']") && READY,
        },
      ],
    },
  ] as const;

  const { apps }: { apps: string[] } = await inquirer.prompt(questions);

  const yarn = apps.includes('yarn') && (await promptYarnAppsOptions());

  return apps.length > 0
    ? {
        node: apps.includes('node'),
        yarn,
        php: apps.includes('php'),
        imagemagick: apps.includes('imagemagick'),
        ffmpeg: apps.includes('ffmpeg'),
        'azure-cli': apps.includes('azure-cli'),
        'git-lfs': apps.includes('git-lfs'),
        'git-flow-avh': apps.includes('git-flow-avh'),
      }
    : true;
};
