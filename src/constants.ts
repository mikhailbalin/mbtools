import chalk from 'chalk';

const status = {
  DONE: chalk.green.bold('DONE'),
  ERROR: chalk.red.bold('ERROR'),
} as const;

export const NOTHING_HAPPENED = `${status.DONE} Nothing happened`;
export const EVERYTHING_READY = `${status.DONE} Everything ready`;
export const SOMETHING_BROKE = `${status.ERROR} Something broke`;
export const READY = 'ready';
export const ARG_PASSWORD = 'password';
export const ARG_UPDATE = 'update';
export const ARG_GIT = 'git';
export const ARG_SSH = 'ssh';
export const ARG_FISH = 'fish';
export const ARG_BREW = 'brew';
