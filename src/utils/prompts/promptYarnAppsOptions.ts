import inquirer from 'inquirer';
import { config } from '../../config';
import { READY } from '../../constants';
import { TYarn } from '../../types';

const yarnApps: (keyof TYarn)[] = [
  'serve',
  'lerna',
  'pkg',
  'uuid',
  '@vue/cli',
  'json-server',
  'gatsby-cli',
  'npm-check-updates',
  'package-size',
  'tldr',
];

export const promptYarnAppsOptions = async (): Promise<TYarn | boolean> => {
  const questions = [
    {
      type: 'checkbox',
      name: 'apps',
      message: 'Yarn apps to install?',
      choices: yarnApps.map((app) => ({
        name: app,
        value: app,
        disabled: !!config.get(`brew.yarn.${app}`) && READY,
      })),
    },
  ] as const;

  const { apps }: { apps: string[] } = await inquirer.prompt(questions);

  return apps.length > 0
    ? {
        serve: apps.includes('serve'),
        lerna: apps.includes('lerna'),
        pkg: apps.includes('pkg'),
        uuid: apps.includes('uuid'),
        tldr: apps.includes('tldr'),
        '@vue/cli': apps.includes('@vue/cli'),
        'json-server': apps.includes('json-server'),
        'gatsby-cli': apps.includes('gatsby-cli'),
        'npm-check-updates': apps.includes('npm-check-updates'),
        'package-size': apps.includes('package-size'),
      }
    : true;
};
