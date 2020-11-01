import execa from 'execa';

export async function configureGit() {
  try {
    const settings = new Map([
      ['user.name', 'Misha Balin'],
      ['user.email', 'm.balin@icloud.com'],
      ['core.editor', 'nano'],
    ]);

    for (const [k, v] of settings.entries()) {
      await execa('git', ['config', '--global', k, v]);
    }
  } catch {
    throw new Error('Git initialization');
  }
}
