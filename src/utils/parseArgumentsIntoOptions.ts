import yargs from 'yargs';
import type { IArguments } from '../types';

function parseArgumentsIntoOptions(rawArgs: string[]): IArguments {
  const argv = yargs(rawArgs.slice(2))
    .usage('Usage: DROPBOX_ACCESS_TOKEN=[string] $0 -p [string]')
    .options({
      update: {
        type: 'boolean',
        alias: 'u',
        default: false,
        desc: 'Update system',
      },
      git: {
        type: 'boolean',
        alias: 'g',
        default: false,
        desc: 'Configure git',
      },
      fish: {
        type: 'boolean',
        alias: 'f',
        default: false,
        desc: 'Install or/and configure fish',
      },
      ssh: {
        type: 'boolean',
        alias: 's',
        default: false,
        desc: 'Configure fish',
      },
      brew: {
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
      password: { type: 'string', alias: 'p', desc: 'WSL password' },
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
