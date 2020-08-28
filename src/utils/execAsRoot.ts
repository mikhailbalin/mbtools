import execa from 'execa';

const execAsRoot = async (command: string, password: string) => {
  const result = await execa.command(`sudo -S ${command}`);

  console.log(result.stdout);

  // result.stdin?.write(`${password}\n`);

  // if ((await result).failed) {
  //   return Promise.reject(new Error('Fail'));
  // }

  // return Promise.resolve('Cool');
};

export default execAsRoot;
