import chalk from 'chalk';

const status = {
  DONE: chalk.green.bold('DONE'),
  ERROR: chalk.red.bold('ERROR'),
} as const;

export const NOTHING_HAPPENED = `${status.DONE} Nothing happened`;
export const EVERYTHING_READY = `${status.DONE} Everything ready`;
export const SOMETHING_BROKE = `${status.ERROR} Something broke`;

export const options = {
  UPDATE: {
    arg: 'update',
    desc: 'Update system',
  },
  GIT: {
    arg: 'git',
    desc: 'Configure git',
  },
  FISH: {
    arg: 'fish',
    desc: 'Install or/and configure Fish',
  },
  SSH: {
    arg: 'ssh',
    desc: 'Configure ssh',
  },
  BREW: {
    arg: 'brew',
    desc: 'Install Brew and apps',
  },
  PASSWORD: {
    arg: 'password',
    desc: 'WSL password',
  },
} as const;

export const READY = 'ready';
