import inquirer from 'inquirer';
import { config } from '../../config';
import { READY } from '../../constants';
import { TYarn } from '../../types';

export const promptYarnAppsOptions = async (): Promise<TYarn> => {
  const questions = [
    {
      type: 'checkbox',
      name: 'apps',
      message: 'What Yarn apps would you like to install?',
      choices: [
        {
          name: 'serve',
          value: 'serve',
          checked: !!config.get('brew.yarn.serve'),
          disabled: config.get('brew.yarn.serve') && READY,
        },
        {
          name: 'lerna',
          value: 'lerna',
          checked: !!config.get('brew.yarn.lerna'),
          disabled: config.get('brew.yarn.lerna') && READY,
        },
        {
          name: 'pkg',
          value: 'pkg',
          checked: !!config.get('brew.yarn.pkg'),
          disabled: config.get('brew.yarn.pkg') && READY,
        },
        {
          name: 'uuid',
          value: 'uuid',
          checked: !!config.get('brew.yarn.uuid'),
          disabled: config.get('brew.yarn.uuid') && READY,
        },
        {
          name: '@vue/cli',
          value: '@vue/cli',
          checked: !!config.get("brew.yarn['@vue/cli']"),
          disabled: config.get("brew.yarn['@vue/cli']") && READY,
        },
        {
          name: 'json-server',
          value: 'json-server',
          checked: !!config.get("brew.yarn['json-server']"),
          disabled: config.get("brew.yarn['json-server']") && READY,
        },
        {
          name: 'gatsby-cli',
          value: 'gatsby-cli',
          checked: !!config.get("brew.yarn['gatsby-cli']"),
          disabled: config.get("brew.yarn['gatsby-cli']") && READY,
        },
        {
          name: 'npm-check-updates',
          value: 'npm-check-updates',
          checked: !!config.get("brew.yarn['npm-check-updates']"),
          disabled: config.get("brew.yarn['npm-check-updates']") && READY,
        },
        {
          name: 'package-size',
          value: 'package-size',
          checked: !!config.get("brew.yarn['package-size']"),
          disabled: config.get("brew.yarn['package-size']") && READY,
        },
      ],
    },
  ] as const;

  const { apps }: { apps: string[] } = await inquirer.prompt(questions);

  return apps.length > 0
    ? {
        serve: apps.includes('serve'),
        lerna: apps.includes('lerna'),
        pkg: apps.includes('pkg'),
        uuid: apps.includes('uuid'),
        '@vue/cli': apps.includes('@vue/cli'),
        'json-server': apps.includes('json-server'),
        'gatsby-cli': apps.includes('gatsby-cli'),
        'npm-check-updates': apps.includes('npm-check-updates'),
        'package-size': apps.includes('package-size'),
      }
    : true;
};
