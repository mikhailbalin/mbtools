import ejs from 'ejs';
import { TOptions } from './parseArgumentsIntoOptions';

export default async function render(
  content: string | undefined,
  options: Omit<TOptions, 'skipPrompts'> & { display: boolean; yarn: boolean },
) {
  if (!content) return '';
  return await ejs.render(content, options, { async: true });
}
