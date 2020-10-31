import './dotenvSetup';
import { parseArgumentsIntoOptions, promptForMissingOptions } from './utils';
import { setupSystem } from './main';

export async function run(args: string[]) {
  const rawOptions = parseArgumentsIntoOptions(args);
  const options = await promptForMissingOptions(rawOptions);
  await setupSystem(options);
}
