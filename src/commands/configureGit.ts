import execa from 'execa';
import { ListrTaskWrapper } from 'listr';

export async function configureGit(task: ListrTaskWrapper) {
  try {
    const settings = new Map([
      ['user.name', 'Misha Balin'],
      ['user.email', 'm.balin@icloud.com'],
      ['core.editor', 'nano'],
    ]);

    for (const [k, v] of settings.entries()) {
      await execa('git', ['config', '--global', k, v]);
    }
  } catch (error) {
    task.skip(error.message);
  }
}
