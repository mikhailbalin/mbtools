import './config';
import { parseArgumentsIntoOptions, promptMissingOptions } from './utils';
import { setupSystem } from './main';

export async function run(args: string[]) {
  const rawOptions = parseArgumentsIntoOptions(args);
  const options = await promptMissingOptions(rawOptions);
  await setupSystem(options);
}
