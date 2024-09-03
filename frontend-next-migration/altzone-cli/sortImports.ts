import { ImportDeclaration, Project, SourceFile } from 'ts-morph';

// List of layers for sorting
const layers = [
    '@/app',
    '@/preparedPages',
    '@/widgets',
    '@/features',
    '@/entities',
    '@/shared',
];

// Asynchronous function to process a file
async function processFile(sourceFile: SourceFile) {
    try {
        const importDeclarations = sourceFile.getImportDeclarations();

        // Group imports into categories
        const libraryImports: ImportDeclaration[] = [];
        const layerImports: ImportDeclaration[] = [];
        const relativeImports: ImportDeclaration[] = [];

        importDeclarations.forEach((importDecl) => {
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
        const sortedImportsStructures = [
            ...libraryImports,
            ...layerImports,
            ...relativeImports
        ].map(importDecl => importDecl.getStructure());

        // Remove existing imports
        importDeclarations.forEach(importDecl => importDecl.remove());

        // Add sorted imports to the file
        sortedImportsStructures.forEach(importStructure => sourceFile.addImportDeclaration(importStructure));

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
        await processFile(sourceFile);
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
