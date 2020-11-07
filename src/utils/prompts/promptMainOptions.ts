import inquirer from 'inquirer';
import { READY, options } from '../../constants';
import { config } from '../../config';
import { TOptions } from '../../types';

const { UPDATE, GIT, FISH, SSH, BREW } = options;

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
          name: UPDATE.desc,
          value: UPDATE.arg,
          checked: update,
        },
        {
          name: GIT.desc,
          value: GIT.arg,
          checked: git,
          disabled: config.get(GIT.arg) && READY,
        },
        {
          name: FISH.desc,
          value: FISH.arg,
          checked: fish,
        },
        {
          name: SSH.desc,
          value: SSH.arg,
          checked: ssh,
          disabled: config.get(SSH.arg) && READY,
        },
        {
          name: BREW.desc,
          value: BREW.arg,
          checked: brew,
        },
      ],
    },
  ] as const;

  const result = await inquirer.prompt(questions);
  return result.actions;
};
