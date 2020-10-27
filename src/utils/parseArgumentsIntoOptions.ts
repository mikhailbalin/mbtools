import arg from 'arg';
import {
  ARG_BREW,
  ARG_FISH,
  ARG_GIT,
  ARG_PASSWORD,
  ARG_SSH,
  ARG_UPDATE,
} from '../constants';

function parseArgumentsIntoOptions(rawArgs: string[]) {
  const args = arg(
    {
      [`--${ARG_PASSWORD}`]: String,
      [`--${ARG_UPDATE}`]: Boolean,
      [`--${ARG_GIT}`]: Boolean,
      [`--${ARG_SSH}`]: Boolean,
      [`--${ARG_FISH}`]: Boolean,
      [`--${ARG_BREW}`]: Boolean,
      '--yes': Boolean,
      '-p': `--${ARG_PASSWORD}`,
      '-u': `--${ARG_UPDATE}`,
      '-g': `--${ARG_GIT}`,
      '-f': `--${ARG_SSH}`,
      '-b': `--${ARG_FISH}`,
      '-y': `--${ARG_BREW}`,
    },
    {
      argv: rawArgs.slice(2),
    },
  );

  return {
    password: args[`--${ARG_PASSWORD}`] || null,
    update: args[`--${ARG_UPDATE}`] || false,
    git: args[`--${ARG_GIT}`] || false,
    ssh: args[`--${ARG_SSH}`] || false,
    fish: args[`--${ARG_FISH}`] || false,
    brew: args[`--${ARG_BREW}`] || false,
    skipPrompts: args['--yes'] || false,
  };
}

export type TOptions = ReturnType<typeof parseArgumentsIntoOptions>;
export default parseArgumentsIntoOptions;
