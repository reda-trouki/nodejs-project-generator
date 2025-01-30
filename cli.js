#!/usr/bin/env node

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import generateProject from './generateProject.js';

// Calculate __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

generateProject().catch(console.error);