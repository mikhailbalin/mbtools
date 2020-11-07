import { options } from '../../constants';
import keys from 'lodash/keys';
import pickBy from 'lodash/pickBy';
import type { TOptions } from '../../types';
import { promptMainOptions } from './promptMainOptions';
import { promptPassword } from './promptPassword';

const { UPDATE, GIT, FISH, SSH, BREW } = options;

const includesAny = <T>(arr: T[], values: T[]) =>
  values.some((v) => arr.includes(v));

export default async function promptForMissingOptions(
  options: TOptions,
): Promise<Omit<TOptions, 'skipPrompts'>> {
  const { password: passwordOption, skipPrompts, ...mainOptions } = options;
  const passwordRequireOptions = [UPDATE.arg, FISH.arg, BREW.arg];

  const mainAnswers: string[] | undefined = skipPrompts
    ? undefined
    : await promptMainOptions(mainOptions);

  const shouldAskPassword =
    ((mainAnswers && includesAny(passwordRequireOptions, mainAnswers)) ||
      includesAny(passwordRequireOptions, keys(pickBy(mainOptions)))) &&
    !passwordOption;

  const password: string | undefined = shouldAskPassword
    ? await promptPassword()
    : passwordOption;

  const getOptionValue = (
    value: keyof Omit<TOptions, 'skipPrompts' | 'password'>,
  ) => (mainAnswers && mainAnswers.includes(value)) || mainOptions[value];

  return {
    password,
    update: getOptionValue(UPDATE.arg),
    git: getOptionValue(GIT.arg),
    fish: getOptionValue(FISH.arg),
    ssh: getOptionValue(SSH.arg),
    brew: getOptionValue(BREW.arg),
  };
}
