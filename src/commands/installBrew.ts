import execa from 'execa';
import { appendAsync, existsAsync } from 'fs-jetpack';
import { execAsRoot } from '../utils';
import { getConfigPath } from './installFish';

export async function installBrew(password: string) {
  try {
    await execAsRoot(
      'apt-get install build-essential curl file git -y',
      password,
    );
    await execa.command(
      'git clone https://github.com/Homebrew/brew ~/.linuxbrew/Homebrew',
    );
    await execa.command('mkdir ~/.linuxbrew/bin');
    await execa.command(
      'ln -s ~/.linuxbrew/Homebrew/bin/brew ~/.linuxbrew/bin',
    );

    const result = await existsAsync(getConfigPath('fish.config'));
    if (result === 'file') {
      await appendAsync(
        result,
        '\n# Brew\neval (~/.linuxbrew/bin/brew shellenv)',
      );
    } else {
    }
  } catch {
    throw new Error('Brew install');
  }
}
