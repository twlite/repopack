import * as fs from 'node:fs/promises';
import path from 'node:path';
import { logger } from '../../shared/logger.js';

export const getVersion = async (): Promise<string> => {
  try {
    const packageJson = await parsePackageJson();

    if (!packageJson.version) {
      logger.warn('No version found in package.json');
      return 'unknown';
    }

    return packageJson.version;
  } catch (error) {
    logger.error('Error reading package.json:', error);
    return 'unknown';
  }
};

const parsePackageJson = async (): Promise<{
  name: string;
  version: string;
}> => {
  const dirName = import.meta.dirname;
  const packageJsonPath = path.join(dirName, '..', '..', '..', 'package.json');
  const packageJsonFile = await fs.readFile(packageJsonPath, 'utf-8');
  const packageJson = JSON.parse(packageJsonFile);
  return packageJson;
};
