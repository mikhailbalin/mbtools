import inquirer from 'inquirer';
import { config } from '../../config';
import { READY } from '../../constants';
import { TBrew } from '../../types';
import { promptYarnAppsOptions } from './promptYarnAppsOptions';

const brewApps: { name: string; value: keyof TBrew }[] = [
  { name: 'Node', value: 'node' },
  { name: 'Yarn and apps', value: 'yarn' },
  { name: 'PHP', value: 'php' },
  { name: 'ImageMagick', value: 'imagemagick' },
  { name: 'FFmpeg', value: 'ffmpeg' },
  { name: 'Azure CLI', value: 'azure-cli' },
  { name: 'Git LFS', value: 'git-lfs' },
  { name: 'Git Flow', value: 'git-flow-avh' },
];

export const promptAppsOptions = async (): Promise<TBrew | boolean> => {
  const questions = [
    {
      type: 'checkbox',
      name: 'apps',
      message: 'Brew apps to install?',
      choices: brewApps.map((app) => ({
        name: app.name,
        value: app.value,
        disabled: !!config.get(`brew.${app.value}`) && READY,
      })),
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
