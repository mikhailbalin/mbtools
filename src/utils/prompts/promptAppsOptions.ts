import inquirer from 'inquirer';
import { config } from '../../config';
import { READY } from '../../constants';
import { TContext } from '../../types';

export const promptAppsOptions = async (): Promise<TContext['brew']> => {
  const questions = [
    {
      type: 'checkbox',
      name: 'apps',
      message: 'What Brew apps would you like to install?',
      choices: [
        {
          name: 'Node',
          value: 'node',
          disabled: config.get('brew.node') && READY,
        },
        {
          name: 'Yarn',
          value: 'yarn',
          disabled: config.get('brew.yarn') && READY,
        },
        {
          name: 'PHP',
          value: 'php',
          disabled: config.get('brew.php') && READY,
        },
        {
          name: 'ImageMagick',
          value: 'imagemagick',
          disabled: config.get('brew.imagemagick') && READY,
        },
        {
          name: 'FFmpeg',
          value: 'ffmpeg',
          disabled: config.get('brew.ffmpeg') && READY,
        },
        {
          name: 'Azure CLI',
          value: 'azure-cli',
          disabled: config.get('brew.azure-cli') && READY,
        },
        {
          name: 'Git LFS',
          value: 'git-lfs',
          disabled: config.get('brew.git-lfs') && READY,
        },
        {
          name: 'Git Flow',
          value: 'git-flow-avh',
          disabled: config.get('brew.git-flow-avh') && READY,
        },
      ],
    },
  ] as const;

  const result: { apps: string[] } = await inquirer.prompt(questions);
  return result.apps.length > 0
    ? {
        node: result.apps.includes('node'),
        yarn: result.apps.includes('yarn'),
        php: result.apps.includes('php'),
        imagemagick: result.apps.includes('imagemagick'),
        ffmpeg: result.apps.includes('ffmpeg'),
        'azure-cli': result.apps.includes('azure-cli'),
        'git-lfs': result.apps.includes('git-lfs'),
        'git-flow-avh': result.apps.includes('git-flow-avh'),
      }
    : true;
};
