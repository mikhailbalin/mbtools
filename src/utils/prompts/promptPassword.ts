import inquirer from 'inquirer';

const passwordValidator = async (input: string) => {
  if (input === '') return 'Password should not be empty.';
  return true;
};

export const promptPassword = async () => {
  const resault = await inquirer.prompt({
    type: 'password',
    name: 'password',
    message: 'WSL password?',
    validate: passwordValidator,
  });

  return resault.password;
};
