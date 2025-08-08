// Escapes HTML special characters (e.g., <, >, &, ", ') for safe rendering
export function escapeHtml(s: string) {
    return s
        .replaceAll(/&/g, '&amp;')
        .replaceAll(/</g, '&lt;')
        .replaceAll(/>/g, '&gt;')
        .replaceAll(/"/g, '&quot;')
        .replaceAll(/'/g, '&#39;');
}

// Converts URLs in text into clickable links with underline styling
export function linkify(text: string): string {
    const escaped = escapeHtml(text);

    const urlRe = /\b(https?:\/\/[^\s<>()]+|www\.[^\s<>()]+)\b/g;

    return escaped.replace(urlRe, (raw) => {
        let url = raw;
        let trailing = '';

        // Move trailing punctuation outside the link
        while (/[),.;:!?]$/.test(url)) {
            trailing = url.slice(-1) + trailing;
            url = url.slice(0, -1);
        }

        if (!url) return raw;

        const href = url.startsWith('www.') ? `https://${url}` : url;

        return `<a href="${href}" target="_blank" rel="noopener noreferrer" style="color:#121212; text-decoration:underline;">${url}</a>${escapeHtml(trailing)}`;
    });
}
