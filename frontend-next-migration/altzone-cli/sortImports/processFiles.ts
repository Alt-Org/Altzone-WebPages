import { Project } from 'ts-morph';
import { processFile } from './processFile';
import { appLayers } from '../const';

// Function to process multiple files
async function processFiles(paths: string[]) {
    const project = new Project({});
    const sourceFiles = project.addSourceFilesAtPaths(paths);

    if (sourceFiles.length === 0) {
        console.error('No files found.');
        return;
    }

    for (const sourceFile of sourceFiles) {
        await processFile(sourceFile, appLayers);
    }

    console.log('All files processed.');
}

export { processFiles };
