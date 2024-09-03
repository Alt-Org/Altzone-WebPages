import { ImportDeclaration, Project, SourceFile} from 'ts-morph';
import {appLayers} from "../const";

// Asynchronous function to process a file
async function processFile(sourceFile: SourceFile, layers: string[]) {
    try {
        // Create a regular expression to filter lines checking for client directives in Next.js
        const pattern = /^['"]use client['"];?$/;
        // Get the file text and split it into lines
        const lines = sourceFile.getFullText().split('\n');
        // Filter lines and simultaneously check for the pattern
        let hasUseClientDirective = false;
        const updatedLines = lines.filter(line => {
            const trimmedLine = line.trim();
            if (pattern.test(trimmedLine)) {
                hasUseClientDirective = true;
                return false; // Exclude lines matching the pattern
            }
            return true; // Keep other lines
        });

        if (hasUseClientDirective) {
            sourceFile.replaceWithText(updatedLines.join('\n'));
        }

        const importDeclarations = sourceFile.getImportDeclarations();
        // Group imports into categories
        const libraryImports: ImportDeclaration[] = [];
        const layerImports: ImportDeclaration[] = [];
        const relativeImports: ImportDeclaration[] = [];

        importDeclarations.forEach(importDecl => {
            const moduleSpecifier = importDecl.getModuleSpecifierValue();

            // Determine the category for the import
            if (moduleSpecifier.startsWith('.') || moduleSpecifier.startsWith('..')) {
                relativeImports.push(importDecl);
            } else if (layers.some(layer => moduleSpecifier.startsWith(layer))) {
                layerImports.push(importDecl);
            } else {
                libraryImports.push(importDecl);
            }
        });

        // Sort library imports alphabetically
        libraryImports.sort((a, b) => {
            const aPath = a.getModuleSpecifierValue();
            const bPath = b.getModuleSpecifierValue();
            return aPath.localeCompare(bPath);
        });

        // Sort layer imports according to the order of paths in layers
        layerImports.sort((a, b) => {
            const aPath = a.getModuleSpecifierValue();
            const bPath = b.getModuleSpecifierValue();
            const aIndex = layers.findIndex(layer => aPath.startsWith(layer));
            const bIndex = layers.findIndex(layer => bPath.startsWith(layer));
            return aIndex - bIndex;
        });

        // Sort relative imports alphabetically
        relativeImports.sort((a, b) => {
            const aPath = a.getModuleSpecifierValue();
            const bPath = b.getModuleSpecifierValue();
            return aPath.localeCompare(bPath);
        });

        // Combine sorted imports
        const sortedImportStructures = [
            ...libraryImports,
            ...layerImports,
            ...relativeImports
        ].map(importDecl => importDecl.getStructure());

        // Remove existing imports and add sorted imports
        sourceFile.getImportDeclarations().forEach(importDecl => importDecl.remove());
        sortedImportStructures.forEach(importStructure => sourceFile.addImportDeclaration(importStructure));

        // Add 'use client' directive at the beginning
        if (hasUseClientDirective) {
            sourceFile.insertText(0, "'use client'\n");
            console.log(`'use client' directive added at the beginning of ${sourceFile.getFilePath()}.`);
        }

        // Save changes
        await sourceFile.save();  // Asynchronous file save

        console.log(`Imports successfully sorted and saved for ${sourceFile.getFilePath()}.`);
    } catch (error) {
        console.error(`Error processing file ${sourceFile.getFilePath()}:`, error);
    }
}

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
const paths = args.length ? args : ['src/**/*.ts', 'src/**/*.tsx'];

if (paths.length === 0) {
    console.error('Please specify at least one path or pattern.');
    process.exit(1);
}

// Call the asynchronous function to process files at the specified paths
processFiles(paths);
