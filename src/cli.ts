import parseArgumentsIntoOptions from './utils/parseArgumentsIntoOptions';
import promptForMissingOptions from './utils/promptForMissingOptions';
import { setupSystem } from './main';

export async function run(args: string[]) {
  const rawOptions = parseArgumentsIntoOptions(args);
  const options = await promptForMissingOptions(rawOptions);
  await setupSystem(options);
}
