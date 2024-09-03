// import { ImportDeclaration, Project } from 'ts-morph';
//
// // Getting command line arguments
// const args = process.argv.slice(2);
//
// const filePath = args[0];
//
// if (!filePath) {
//     console.error('Please specify the file path.');
//     process.exit(1);
// }
//
// const layers = [
//     '@/app',
//     '@/preparedPages',
//     '@/widgets',
//     '@/features',
//     '@/entities',
//     '@/shared',
// ];
//
// // Asynchronous function to execute the main code
// async function processFile() {
//     // Initialize the project
//     const project = new Project({});
//
//     try {
//         // Add the file at the specified path
//         const sourceFile = project.addSourceFileAtPath(filePath);
//
//         if (!sourceFile) {
//             console.error('File not found');
//             return;
//         }
//
//         const importDeclarations = sourceFile.getImportDeclarations();
//
//         // Separate imports into groups
//         const layerImports: ImportDeclaration[] = [];
//         const relativeImports: ImportDeclaration[] = [];
//
//         importDeclarations.forEach((importDecl) => {
//             const moduleSpecifier = importDecl.getModuleSpecifierValue();
//             if (layers.some(layer => moduleSpecifier.startsWith(layer))) {
//                 layerImports.push(importDecl);
//             } else {
//                 relativeImports.push(importDecl);
//             }
//         });
//
//         // Sort by the order of paths from layers
//         layerImports.sort((a, b) => {
//             const aPath = a.getModuleSpecifierValue();
//             const bPath = b.getModuleSpecifierValue();
//
//             const aIndex = layers.findIndex(layer => aPath.startsWith(layer));
//             const bIndex = layers.findIndex(layer => bPath.startsWith(layer));
//
//             return aIndex - bIndex;
//         });
//
//         // Sort relative imports alphabetically
//         relativeImports.sort((a, b) => {
//             const aPath = a.getModuleSpecifierValue();
//             const bPath = b.getModuleSpecifierValue();
//
//             return aPath.localeCompare(bPath);
//         });
//
//         // Combine sorted imports and save their structures
//         const sortedImportsStructures = [...layerImports, ...relativeImports].map(importDecl => importDecl.getStructure());
//
//         // Remove existing imports
//         importDeclarations.forEach(importDecl => importDecl.remove());
//
//         // Add sorted imports to the file
//         sortedImportsStructures.forEach(importStructure => sourceFile.addImportDeclaration(importStructure));
//
//         // Save changes
//         await sourceFile.save();  // Asynchronous file saving
//
//         console.log('Imports successfully sorted and saved.');
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }
//
// // Call the asynchronous function
// processFile();

import { ImportDeclaration, Project, SourceFile } from 'ts-morph';

// Список слоев для упорядочивания
const layers = [
    '@/app',
    '@/preparedPages',
    '@/widgets',
    '@/features',
    '@/entities',
    '@/shared',
];

// Асинхронная функция для обработки файла
async function processFile(sourceFile: SourceFile) {
    try {
        // Проверка на наличие строковых директив (например, 'use client')
        const firstStatement = sourceFile.getStatements()[0];
        const useClientDirective = firstStatement.getText().startsWith("'use client'") || firstStatement.getText().startsWith('"use client"')
            ? firstStatement
            : null;

        const importDeclarations = sourceFile.getImportDeclarations();

        // Разделение импортов на группы
        const layerImports: ImportDeclaration[] = [];
        const relativeImports: ImportDeclaration[] = [];

        importDeclarations.forEach((importDecl) => {
            const moduleSpecifier = importDecl.getModuleSpecifierValue();
            if (layers.some(layer => moduleSpecifier.startsWith(layer))) {
                layerImports.push(importDecl);
            } else {
                relativeImports.push(importDecl);
            }
        });

        // Сортировка по порядку путей из layers
        layerImports.sort((a, b) => {
            const aPath = a.getModuleSpecifierValue();
            const bPath = b.getModuleSpecifierValue();

            const aIndex = layers.findIndex(layer => aPath.startsWith(layer));
            const bIndex = layers.findIndex(layer => bPath.startsWith(layer));

            return aIndex - bIndex;
        });

        // Сортировка относительных импортов в алфавитном порядке
        relativeImports.sort((a, b) => {
            const aPath = a.getModuleSpecifierValue();
            const bPath = b.getModuleSpecifierValue();

            return aPath.localeCompare(bPath);
        });

        // Объединение отсортированных импортов и сохранение их структур
        const sortedImportsStructures = [...layerImports, ...relativeImports].map(importDecl => importDecl.getStructure());

        // Удаление существующих импортов
        importDeclarations.forEach(importDecl => importDecl.remove());

        // Если директива 'use client' существует, добавляем её обратно первой
        if (useClientDirective) {
            sourceFile.insertStatements(0, useClientDirective.getText());
            useClientDirective.remove();  // Удаляем оригинальную директиву, чтобы не дублировать
        }

        // Добавление отсортированных импортов в файл
        sortedImportsStructures.forEach(importStructure => sourceFile.addImportDeclaration(importStructure));

        // Сохранение изменений
        await sourceFile.save();  // Асинхронное сохранение файла

        console.log(`Imports successfully sorted and saved for ${sourceFile.getFilePath()}.`);
    } catch (error) {
        console.error(`Error processing file ${sourceFile.getFilePath()}:`, error);
    }
}


// Асинхронная функция для обработки нескольких файлов
async function processFiles(paths: string[]) {
    const project = new Project({});

    // Добавление файлов по указанным путям/паттернам
    const sourceFiles = project.addSourceFilesAtPaths(paths);

    if (sourceFiles.length === 0) {
        console.error('No files found.');
        return;
    }

    // Обработка каждого файла
    for (const sourceFile of sourceFiles) {
        await processFile(sourceFile);
    }

    console.log('All files processed.');
}

// Получение аргументов командной строки
const args = process.argv.slice(2);
const paths = args.length ? args : ['src/**/*.ts', 'src/**/*.tsx'];

if (paths.length === 0) {
    console.error('Please specify at least one path or pattern.');
    process.exit(1);
}

// Вызов асинхронной функции для обработки файлов по переданным путям
processFiles(paths);
