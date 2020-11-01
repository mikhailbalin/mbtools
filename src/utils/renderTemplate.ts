import ejs from 'ejs';
import type { TContext } from '../types';

export default async function renderTemplate(
  template: string | undefined,
  data: TContext,
) {
  if (!template) return '';
  return await ejs.render(template, data, { async: true });
}
