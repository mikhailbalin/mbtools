import inquirer from 'inquirer';
import {
  READY,
  ARG_BREW,
  ARG_FISH,
  ARG_GIT,
  ARG_SSH,
  ARG_UPDATE,
} from '../../constants';
import { config } from '../../config';
import { TOptions } from '../../types';

export const promptMainOptions = async ({
  update,
  git,
  fish,
  ssh,
  brew,
}: Omit<TOptions, 'skipPrompts' | 'password'>) => {
  const questions = [
    {
      type: 'checkbox',
      name: 'actions',
      message: 'What would you like to do?',
      choices: [
        {
          name: 'Update system',
          value: ARG_UPDATE,
          checked: update,
        },
        {
          name: 'Configure git',
          value: ARG_GIT,
          checked: git,
          disabled: config.get(ARG_GIT) && READY,
        },
        {
          name: 'Configure or install fish',
          value: ARG_FISH,
          checked: fish,
        },
        {
          name: 'Configure ssh',
          value: ARG_SSH,
          checked: ssh,
          disabled: config.get(ARG_SSH) && READY,
        },
        {
          name: 'Install Brew',
          value: ARG_BREW,
          checked: brew,
        },
      ],
    },
  ] as const;

  const result = await inquirer.prompt(questions);
  return result.actions;
};
