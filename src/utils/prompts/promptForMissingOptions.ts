import inquirer from 'inquirer';
import {
  ARG_BREW,
  ARG_FISH,
  ARG_GIT,
  ARG_SSH,
  ARG_UPDATE,
} from '../../constants';
import type { TOptions } from '../../types';
import { promptMainOptions } from './promptMainOptions';

const includesAny = <T>(arr: T[], values: T[]) =>
  values.some((v) => arr.includes(v));

const passwordValidator = async (input: string) => {
  if (input === '') return 'Password should not be empty.';
  return true;
};

export default async function promptForMissingOptions(
  options: TOptions,
): Promise<Omit<TOptions, 'skipPrompts'>> {
  const { password: optionsPassword, skipPrompts, ...rest } = options;

  const answers: string[] | null = skipPrompts
    ? null
    : await promptMainOptions(rest);
  let password: string | null = optionsPassword;

  const shouldAskPassword =
    skipPrompts ||
    (answers && includesAny([ARG_UPDATE, ARG_FISH, ARG_BREW], answers));

  if (!password && shouldAskPassword) {
    const resault = await inquirer.prompt({
      type: 'password',
      name: 'password',
      message: 'WSL password?',
      validate: passwordValidator,
    });

    password = resault.password;
  }

  const getOptionValue = (
    value: keyof Omit<TOptions, 'skipPrompts' | 'password'>,
  ) => (answers && answers.includes(value)) || options[value];

  return {
    password,
    update: getOptionValue(ARG_UPDATE),
    git: getOptionValue(ARG_GIT),
    ssh: getOptionValue(ARG_SSH),
    fish: getOptionValue(ARG_FISH),
    brew: getOptionValue(ARG_BREW),
  };
}
