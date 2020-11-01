import fs from 'fs';
import { Console } from 'console';

const output = fs.createWriteStream('./stdout.log');
const errorOutput = fs.createWriteStream('./stderr.log');

/**
 * Log events.
 *
 * @example
 *
 * logger.log('number:', 5);
 * logger.error('error code:', 1);
 */
const logger = new Console({ stdout: output, stderr: errorOutput });

export default logger;
