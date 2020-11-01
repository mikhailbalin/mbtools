import { ListrTaskWrapper } from 'listr';
import execAsRoot from '../utils/execAsRoot';

export async function updateSystem(task: ListrTaskWrapper, password: string) {
  try {
    const apt = 'apt-get';

    task.output = 'Updating...';
    await execAsRoot(`${apt} update`, password);

    task.output = 'Upgrading...';
    await execAsRoot(`${apt} upgrade -y`, password);
  } catch (error) {
    task.skip(error.message);
  }
}
