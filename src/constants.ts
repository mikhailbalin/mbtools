import chalk from 'chalk';

const status = {
  DONE: chalk.green.bold('DONE'),
} as const;

export const NOTHING_HAPPENED = `${status.DONE} Nothing to do`;
export const EVERYTHING_READY = `${status.DONE} Everything ready`;
