import { Project } from 'ts-morph';
import { processFile } from './processFile';
import { appLayers } from '../const';
import { execSync } from 'child_process';
import path from 'path';

// Asynchronous function to process multiple files
async function processFiles(paths: string[]) {
    const project = new Project({});

    // Add files from specified paths/patterns
    const sourceFiles = project.addSourceFilesAtPaths(paths);

    if (sourceFiles.length === 0) {
        console.error('No files found.');
        return;
    }

    // Process each file
    for (const sourceFile of sourceFiles) {
        await processFile(sourceFile, appLayers);
    }

    console.log('All files processed.');
}

// Get command-line arguments
const args = process.argv.slice(2);
let paths = args.length ? args : [`src/**/*.ts{,x}`];

const filesIndex = args.indexOf('--files');
if (filesIndex !== -1 && args.length > filesIndex + 1) {
    paths = args.slice(filesIndex + 1); // Take all the values after --files
}

const gitChangesIndex = args.indexOf('--git-changes');
if (gitChangesIndex !== -1) {
    try {
        // Get the list of modified files in Git
        const gitDiffOutput = execSync('git diff --name-only', { encoding: 'utf-8' });
        const gitChangedFiles = gitDiffOutput.split('\n').filter(Boolean); // Remove empty lines

        // Filter only files from the 'src' folder and remove the 'frontend-next-migration/' prefix
        const filteredFiles = gitChangedFiles
            .filter(file => file.startsWith('frontend-next-migration/src/'))
            .map(file => file.replace('frontend-next-migration/', '')); // Remove project folder prefix

        if (filteredFiles.length > 0) {
            paths = filteredFiles;
        } else {
            console.log('No changes detected in the "src" folder.');
            process.exit(0);
        }
    } catch (error) {
        console.error('Failed to get changed files from Git:', error);
        process.exit(1);
    }
}

// todo dont remove it helps to remember format of paths. We should probably add this example to documentation
// const testPaths = ['src/app/[lng]/layout.tsx'];

console.log(paths)
processFiles(paths);
