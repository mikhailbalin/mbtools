import Listr from 'listr';
import os from 'os';
import path from 'path';
import { spawn } from 'child_process';
import { readAsync, writeAsync } from 'fs-jetpack';
import { TOptions } from '../utils/parseArgumentsIntoOptions';
import renderTemplate from '../utils/renderTempate';
// import execAsRoot from '../utils/execAsRoot';

const writeConfig = async (
  fileName: string,
  options: Omit<TOptions, 'skipPrompts'>,
) => {
  const templatePath = path.join(
    __dirname,
    `../templates/${fileName}.fish.ejs`,
  );

  const configTemplate = await readAsync(templatePath);
  const configContent = await renderTemplate(configTemplate, {
    ...options,
    display: false,
    yarn: false,
  });

  if (configContent) {
    await writeAsync(
      `${os.homedir()}/.config/fish${
        fileName !== 'config' ? '/functions' : ''
      }/${fileName}.fish`,
      configContent,
    );
  }
};

export async function installFish(
  task: Listr.ListrTaskWrapper,
  options: Omit<TOptions, 'skipPrompts'>,
) {
  let isInstalled = false;

  const checkInstall = spawn('fish -v', {
    shell: true,
  });

  checkInstall.stdout.on('data', (data) => {
    console.log(`checkInstall stdout:\n${data}`);
    const chunk = data.toString('utf8');
    if (chunk.includes('fish')) {
      isInstalled = true;
    }
  });

  checkInstall.stderr.on('data', (data) => {
    console.log(`checkInstall stderr:\n${data}`);
  });

  checkInstall.on('error', (error) => {
    Promise.reject(new Error(`checkInstall error: ${error.message}`));
  });

  if (!isInstalled) {
    task.output = 'Installing...';

    // const commands = [
    //   'apt-add-repository ppa:fish-shell/release-3',
    //   'apt-get update',
    //   'apt-get install fish -y',
    // ];

    // for (const command of commands) {
    //   await execAsRoot(command, options.password!);
    // }
  }

  task.output = 'Setting config...';

  await writeConfig('config', options);
  await writeConfig('fish_prompt', options);

  // const makeDefault = spawn('chsh -s /usr/bin/fish', {
  //   shell: true,
  // });

  // makeDefault.stderr.on('data', (data: Buffer) => {
  //   const chunk = data.toString('utf8');

  //   if (chunk.includes('Password')) {
  //     makeDefault.stdin.write(`${options.password}\n`, (error) => {
  //       if (error) {
  //         Promise.reject(
  //           new Error(`makeDefault password error: ${error.message}`),
  //         );
  //       }
  //     });
  //   }
  // });

  // makeDefault.on('error', (error) => {
  //   Promise.reject(new Error(`makeDefault error: ${error.message}`));
  // });

  // makeDefault.on('close', (code) => {
  //   return Promise.resolve(`Fish installed and made default with code ${code}`);
  // });
}
