/**
 * Opens a URL in a new tab.
 *
 * @param {string} [newTab] - The URL to open. If not provided, a new blank tab will be opened.
 *
 * @example
 * // Opens 'https://example.com' in a new tab
 * openLinkInNewTab('https://example.com');
 */
export function openLinkInNewTab(newTab?: string) {
    const url = newTab && isValidUrl(newTab) ? newTab : 'about:blank';
    window.open(url, '_blank');
}

function isValidUrl(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch (_) {
        return false;
    }
}
