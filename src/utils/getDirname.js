import { dirname } from 'path';
import { fileURLToPath } from 'url';

const getDirname = importUrl => dirname(fileURLToPath(importUrl));

export default getDirname;
