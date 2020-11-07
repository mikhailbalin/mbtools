import yargs from 'yargs';
import {
  ARG_BREW,
  ARG_FISH,
  ARG_GIT,
  ARG_PASSWORD,
  ARG_SSH,
  ARG_UPDATE,
} from '../constants';
import type { TOptions } from '../types';

function parseArgumentsIntoOptions(rawArgs: string[]): TOptions {
  const argv = yargs(rawArgs.slice(2))
    .usage('Usage: DROPBOX_ACCESS_TOKEN=[string] $0 -p [string]')
    .options({
      [ARG_UPDATE]: {
        type: 'boolean',
        alias: 'u',
        default: false,
        desc: 'Update system',
      },
      [ARG_GIT]: {
        type: 'boolean',
        alias: 'g',
        default: false,
        desc: 'Configure git',
      },
      [ARG_FISH]: {
        type: 'boolean',
        alias: 'f',
        default: false,
        desc: 'Install or/and configure fish',
      },
      [ARG_SSH]: {
        type: 'boolean',
        alias: 's',
        default: false,
        desc: 'Configure fish',
      },
      [ARG_BREW]: {
        type: 'boolean',
        alias: 'b',
        default: false,
        desc: 'Install fish and apps',
      },
      yes: {
        type: 'boolean',
        alias: 'y',
        default: false,
        desc: "Don't prompt for missing options",
      },
      [ARG_PASSWORD]: { type: 'string', alias: 'p', desc: 'WSL password' },
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
