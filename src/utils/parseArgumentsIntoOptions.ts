import yargs from 'yargs';
import { options } from '../constants';
import type { TOptions } from '../types';

const { UPDATE, GIT, FISH, SSH, BREW, PASSWORD } = options;

function parseArgumentsIntoOptions(rawArgs: string[]): TOptions {
  const argv = yargs(rawArgs.slice(2))
    .usage('Usage: DROPBOX_ACCESS_TOKEN=[string] $0 -p [string]')
    .options({
      [PASSWORD.arg]: {
        type: 'string',
        alias: 'p',
        desc: PASSWORD.desc,
      },
      [UPDATE.arg]: {
        type: 'boolean',
        alias: 'u',
        default: false,
        desc: UPDATE.desc,
      },
      [GIT.arg]: {
        type: 'boolean',
        alias: 'g',
        default: false,
        desc: GIT.desc,
      },
      [FISH.arg]: {
        type: 'boolean',
        alias: 'f',
        default: false,
        desc: FISH.desc,
      },
      [SSH.arg]: {
        type: 'boolean',
        alias: 's',
        default: false,
        desc: SSH.desc,
      },
      [BREW.arg]: {
        type: 'boolean',
        alias: 'b',
        default: false,
        desc: BREW.desc,
      },
      yes: {
        type: 'boolean',
        alias: 'y',
        default: false,
        desc: "Don't prompt for missing options",
      },
    }).argv;

  return {
    password: argv.password,
    update: argv.update,
    git: argv.git,
    ssh: argv.ssh,
    fish: argv.fish,
    brew: argv.brew,
    skipPrompts: argv.yes,
  };
}

export default parseArgumentsIntoOptions;
