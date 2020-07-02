import execa from 'execa';

export async function configureGit() {
  const settings = new Map([
    ['user.name', 'Misha Balin'],
    ['user.email', 'm.balin@icloud.com'],
    ['core.editor', 'vim'],
  ]);

  for (const [k, v] of settings.entries()) {
    await execa('git', ['config', '--global', k, v]);
  }

  return Promise.resolve('Cool');
}