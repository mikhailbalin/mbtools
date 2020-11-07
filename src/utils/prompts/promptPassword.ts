import inquirer from 'inquirer';
import { options } from '../../constants';

const { PASSWORD } = options;

const passwordValidator = async (input: string) => {
  if (input === '') return 'Password should not be empty.';
  return true;
};

export const promptPassword = async () => {
  const resault = await inquirer.prompt({
    type: PASSWORD.arg,
    name: PASSWORD.arg,
    message: `${PASSWORD.desc}?`,
    validate: passwordValidator,
  });

  return resault.password;
};
