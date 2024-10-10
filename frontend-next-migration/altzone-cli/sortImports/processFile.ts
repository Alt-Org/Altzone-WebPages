import { ImportDeclaration, SourceFile } from 'ts-morph';

// Utility function to sort imports
function sortImports(imports: ImportDeclaration[], layers: string[]): ImportDeclaration[] {
    const libraryImports: ImportDeclaration[] = [];
    const layerImports: ImportDeclaration[] = [];
    const relativeImports: ImportDeclaration[] = [];

    imports.forEach(importDecl => {
        const moduleSpecifier = importDecl.getModuleSpecifierValue();

        if (moduleSpecifier.startsWith('.') || moduleSpecifier.startsWith('..')) {
            relativeImports.push(importDecl);
        } else if (layers.some(layer => moduleSpecifier.startsWith(layer))) {
            layerImports.push(importDecl);
        } else {
            libraryImports.push(importDecl);
        }
    });

    // Sort library imports alphabetically
    libraryImports.sort((a, b) => a.getModuleSpecifierValue().localeCompare(b.getModuleSpecifierValue()));

    // Sort layer imports according to the order of layers
    layerImports.sort((a, b) => {
        const aPath = a.getModuleSpecifierValue();
        const bPath = b.getModuleSpecifierValue();
        const aIndex = layers.findIndex(layer => aPath.startsWith(layer));
        const bIndex = layers.findIndex(layer => bPath.startsWith(layer));
        return aIndex - bIndex;
    });

    // Sort relative imports alphabetically
    relativeImports.sort((a, b) => a.getModuleSpecifierValue().localeCompare(b.getModuleSpecifierValue()));

    return [...libraryImports, ...layerImports, ...relativeImports];
}

// Function to process a single file
async function processFile(sourceFile: SourceFile, layers: string[]) {
    try {
        const pattern = /^['"]use client['"];?$/;
        const lines = sourceFile.getFullText().split('\n');
        let hasUseClientDirective = false;

        // Remove lines containing 'use client' directive
        const updatedLines = lines.filter(line => {
            const trimmedLine = line.trim();
            if (pattern.test(trimmedLine)) {
                hasUseClientDirective = true;
                return false;
            }
            return true;
        });

        if (hasUseClientDirective) {
            sourceFile.replaceWithText(updatedLines.join('\n'));
        }

        const importDeclarations = sourceFile.getImportDeclarations();
        const sortedImportStructures = sortImports(importDeclarations, layers)
            .map(importDecl => importDecl.getStructure());

        // Remove existing imports and add sorted imports
        sourceFile.getImportDeclarations().forEach(importDecl => importDecl.remove());
        sortedImportStructures.forEach(importStructure => sourceFile.addImportDeclaration(importStructure));

        // Re-add 'use client' directive if it was removed
        if (hasUseClientDirective) {
            sourceFile.insertText(0, "'use client'\n");
            console.log(`'use client' directive added at the beginning of ${sourceFile.getFilePath()}.`);
        }

        await sourceFile.save();
        console.log(`Imports successfully sorted and saved for ${sourceFile.getFilePath()}.`);
    } catch (error) {
        console.error(`Error processing file ${sourceFile.getFilePath()}:`, error);
    }
}

export { processFile };