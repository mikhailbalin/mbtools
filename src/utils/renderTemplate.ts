import ejs from 'ejs';
import type { TOptions } from '../types';

export default async function renderTemplate(
  content: string | undefined,
  options: Omit<TOptions, 'skipPrompts'> & { display: boolean; yarn: boolean },
) {
  if (!content) return '';
  return await ejs.render(content, options, { async: true });
}
