import { Project, QuoteKind } from "ts-morph";
import { processFile } from "./processFile";
import { appLayers } from "../const";
import { exec } from "child_process";
import path from "path";
import { promisify } from "util";

// Convert exec to async function
const execAsync = promisify(exec);

// Asynchronous function to process multiple files
async function processFiles(paths: string[]) {
    const project = new Project({
        manipulationSettings: {
            quoteKind: QuoteKind.Single
        }
    });

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

// Wrapping the code in an immediately invoked async function
(async function() {
    // Get command-line arguments
    const args = process.argv.slice(2);
    let paths = args.length ? args : [`src/**/*.ts{,x}`];

    // Check if the --files flag is present
    const filesIndex = args.indexOf('--files');
    if (filesIndex !== -1 && args.length > filesIndex + 1) {
        paths = args.slice(filesIndex + 1); // Take all the values after --files
    }

    // Flag to determine if we should add files to Git
    let shouldGitAdd = false;

    // Check if the --git-changes flag is present
    const gitChangesIndex = args.indexOf('--git-changes');
    if (gitChangesIndex !== -1) {
        shouldGitAdd = true;
        try {
            const { stdout: gitDiffOutput } = await execAsync('git diff --cached --name-only');
            const gitChangedFiles = gitDiffOutput.split('\n').filter(Boolean); // Remove empty lines
            // Filter only files from the 'src' folder and remove the 'frontend-next-migration/' prefix
            const filteredFiles = gitChangedFiles
                .filter(file => file.startsWith('frontend-next-migration/src/'))
                .map(file => path.resolve(file.replace('frontend-next-migration/', ''))); // Convert to absolute path

            // Remove files that have been deleted from the filtered list
            const existingFiles = filteredFiles.filter(file => {
                return require('fs').existsSync(file); // Check if the file exists
            });

            if (existingFiles.length > 0) {
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

    // Call the asynchronous function to process files at the specified paths
    await processFiles(paths);

    // After processing, add the modified files to the Git index if required
    if (shouldGitAdd) {
        try {
            await execAsync(`git add ${paths.join(' ')}`);
            console.log('Modified files added to Git index.');
        } catch (error) {
            console.error('Failed to add files to Git index:', error);
            process.exit(1);
        }
    }
})();
