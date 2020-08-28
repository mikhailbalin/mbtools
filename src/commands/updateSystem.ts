import { TOptions } from '../utils/parseArgumentsIntoOptions';
import execAsRoot from '../utils/execAsRoot';

export async function updateSystem(options: Omit<TOptions, 'skipPrompts'>) {
  const responce = await execAsRoot('apt-get update', options.password);
  return responce;
}
