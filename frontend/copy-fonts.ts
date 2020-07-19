/*
 * Copy the font files into the directory "src/assets/fonts"
 */

import { exists, copyFile, mkdir } from 'fs';
import * as path from 'path';
import { promisify } from 'util';

const existsAsync = promisify(exists);
const mkDirAsync = promisify(mkdir);
const copyFileAsync = promisify(copyFile);

type ForEchFunc<T> = (value: T) => void;

const forEachAsync = async <T>(list: T[], func: ForEchFunc<T>) => {
  for (let index = 0; index < list.length; index++) {
    await func(list[index]);
  }
};

interface IMap<T> {
  [key: string]: T
}

type ForKeyFunc<T> = (key: string, value: T) => void;

const forKeyAsync = async <T>(list: IMap<T>, func: ForKeyFunc<T>) => {
  for (const [key, value] of Object.entries(list)) {
    await func(key, value);
  }
};

const fontExtensions: string[] = [
  '.woff2',
  '.woff',
];

const robotoFiles: IMap<string> = {
  'roboto-latin-400': 'roboto-normal',
  'roboto-latin-400italic': 'roboto-italic',
  'roboto-latin-900': 'roboto-bold',
  'roboto-latin-900italic': 'roboto-bold-italic'
};


const sourcePaths = {
  Roboto: path.join(__dirname, 'node_modules', 'typeface-roboto', 'files'),
};

const destinationPath = path.join(__dirname, 'src', 'assets', 'fonts');

const copyFonts = async () => {

  console.info('> Info: Copy Roboto Fonts');

  if (!await existsAsync(destinationPath)) {
    await mkDirAsync(destinationPath, {recursive: true});
  }


  await forKeyAsync<string>(robotoFiles, async (srcName: string, destName: string) => {
    await forEachAsync(fontExtensions, async (fileExt: string) => {

      const destFilename = path.join(destinationPath, destName + fileExt);
      const srcFilename = path.join(sourcePaths.Roboto, srcName + fileExt);
      await copyFileAsync(srcFilename, destFilename);

      console.info('> Info: Wrote %s to %s', srcFilename, destFilename);
    });
  });
};

copyFonts()
  .then(() => {
    console.info('> Info: finish of copy fonts');
  })
  .catch(reason => {
    console.error('> Error: ', reason);
  });
