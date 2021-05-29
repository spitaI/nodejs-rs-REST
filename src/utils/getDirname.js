/**
 * @module getDirname
 * @category Utils
 */

import { dirname } from 'path';
import { fileURLToPath } from 'url';

/**
 * Polyfill for __dirname variable in CommonJS
 * @param {string} importUrl - File URI from imports.meta object
 * @returns {string} Analogue of __dirname variable
 */
const getDirname = importUrl => dirname(fileURLToPath(importUrl));

export default getDirname;
