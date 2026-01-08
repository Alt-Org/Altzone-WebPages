// Escapes HTML special characters (e.g., <, >, &, ", ') for safe rendering
export function escapeHtml(input: string) {
    return input
        .replaceAll(/&/g, '&amp;')
        .replaceAll(/</g, '&lt;')
        .replaceAll(/>/g, '&gt;')
        .replaceAll(/"/g, '&quot;')
        .replaceAll(/'/g, '&#39;');
}

// Converts URLs in text into clickable links with underline styling
export function linkify(text: string): string {
    const escaped = escapeHtml(text);

    const urlRe = /\b(https?:\/\/[^\s<>()"]+|www\.[^\s<>()"]+)\b/g;

    return escaped.replace(urlRe, (raw) => {
        let url = raw;
        let trailing = '';

        // Move trailing punctuation outside the link
        while (/[),.;:!?]$/.test(url)) {
            trailing = url.slice(-1) + trailing;
            url = url.slice(0, -1);
        }

        if (!url) return raw;

        const hrefRaw = url.startsWith('www.') ? `https://${url}` : url;
        const href = encodeURI(hrefRaw).replace(/"/g, '&quot;');

        return `<a href="${href}" target="_blank" rel="noopener noreferrer" style="color:#ffa100; text-decoration:none;">${url}</a>${escapeHtml(trailing)}`;
    });
}
