import { Project } from 'ts-morph';
import { processFile } from './processFile';
import { appLayers } from '../const';
import {exec} from 'child_process';
import path from 'path';
import { promisify } from 'util';

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

// Convert exec to async function
const execAsync = promisify(exec);

// Wrapping the code in an immediately invoked async function
(async function() {
    // Get command-line arguments
    const args = process.argv.slice(2);
    let paths = args.length ? args : [`src/**/*.ts{,x}`];

    // Check if the --files flag is present npm run sort-imports --  --files
    const filesIndex = args.indexOf('--files');
    if (filesIndex !== -1 && args.length > filesIndex + 1) {
        paths = args.slice(filesIndex + 1); // Take all the values after --files
    }

    // Check if the --git-changes flag is present example call npm run sort-imports --  --git-changes
    const gitChangesIndex = args.indexOf('--git-changes');
    if (gitChangesIndex !== -1) {
        try {
            // Use async version of exec to call Git
            const { stdout: gitDiffOutput } = await execAsync('git diff --name-only');
            const gitChangedFiles = gitDiffOutput.split('\n').filter(Boolean); // Remove empty lines

            // Filter only files from the 'src' folder and remove the 'frontend-next-migration/' prefix
            const filteredFiles = gitChangedFiles
                .filter(file => file.startsWith('frontend-next-migration/src/'))
                .map(file => path.resolve(file.replace('frontend-next-migration/', ''))); // Convert to absolute path

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

    // todo don't remove this; it helps to remember the format of paths. We should probably add this example to the documentation
    // const testPaths = ['src/app/[lng]/layout.tsx'];

    // Call the asynchronous function to process files at the specified paths
    await processFiles(paths);
})();