/**
 * @param {string[]} languages
 * @param {string} fileName
 * @returns {Promise<Object>}
 */
export function readLocalizationFiles(languages, fileName) {
    const basePath = 'src/shared/i18n/locales';
    const localizationData = {};

    const readFileCommands = languages.map(language => {
        return () => cy.readFile(`${basePath}/${language}/${fileName}.json`).then(content => {
            localizationData[language] = content;
        });
    });

    const executeCommandsSequentially = (commands) => {
        if (commands.length) {
            return commands[0]().then(() => executeCommandsSequentially(commands.slice(1)));
        }
    };

    return executeCommandsSequentially(readFileCommands).then(() => localizationData);
}
