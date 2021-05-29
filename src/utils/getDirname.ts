import { dirname } from 'path';
import { fileURLToPath } from 'url';

const getDirname = (importUrl: string): string =>
  dirname(fileURLToPath(importUrl));

export default getDirname;
