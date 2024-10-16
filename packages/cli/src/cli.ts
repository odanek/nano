import {program} from 'commander';

const cwd = process.cwd();

program.name('nano').description('Nano UI CLI').version('0.1.0');

program.command('bundle').description('Bundle package').argument('<string>', 'Package directory', cwd);
