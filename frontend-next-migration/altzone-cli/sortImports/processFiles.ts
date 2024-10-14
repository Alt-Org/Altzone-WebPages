import { Project } from 'ts-morph';
import { processFile } from './processFile';
import { appLayers } from '../const';

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
const paths = args.length ? args : [`src/**/*.ts{,x}`];

if (paths.length === 0) {
    console.error('Please specify at least one path or pattern.');
    process.exit(1);
}

// Call the asynchronous function to process files at the specified paths
processFiles(paths);
