interface FormatDateOptions {
    locale?: string;
    format?: 'long' | 'short' | 'numeric';
    fallback?: string;
}

function getFormatOptions(format: 'long' | 'short' | 'numeric'): Intl.DateTimeFormatOptions {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric' };
    switch (format) {
        case 'long':
            options.month = 'long';
            options.day = 'numeric';
            break;
        case 'short':
            options.month = 'short';
            options.day = 'numeric';
            break;
        case 'numeric':
            options.month = '2-digit';
            options.day = '2-digit';
            break;
    }
    return options;
}

export function formatDate(
    dateString: string | null | Date,
    options: FormatDateOptions = {},
): string {
    if (!dateString) {
        return options.fallback || '';
    }

    let date: Date;

    if (dateString instanceof Date) {
        date = dateString;
    } else {
        date = new Date(dateString);
    }

    if (isNaN(date.getTime())) {
        return options.fallback || '';
    }

    const locale = options.locale || 'fi-FI';
    const format = options.format || 'long';

    const formatOptions = getFormatOptions(format);

    return new Intl.DateTimeFormat(locale, formatOptions).format(date);
}
