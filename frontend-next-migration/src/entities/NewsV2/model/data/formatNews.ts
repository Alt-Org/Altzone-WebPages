'use client';

export function formatNews(newsArray: any[] = [], lngCode: string) {
    return newsArray.map((newsItem) => {
        const translation = newsItem.translations.find((t: any) => t.languages_code === lngCode);

        return {
            id: newsItem.id,
            date: newsItem.date,
            title: translation?.title || '',
            titlePicture: newsItem.titlePicture || null,
            previewText: translation?.preview_text || '',
            bodyText: translation?.body_text || '',
        };
    });
}

export function formatNewsSingle(newsItem: any, lngCode: string) {
    const translation = newsItem.translations.find((t: any) => t.languages_code === lngCode);

    const formattedDate = new Date(newsItem.date).toLocaleDateString('fi-FI', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const formattedAuthor = newsItem.author
        ? `${newsItem.author.first_name || ''} ${newsItem.author.last_name || ''}`.trim()
        : '';

    return {
        id: newsItem.id,
        date: newsItem.date,
        title: translation?.title || '',
        titlePicture: newsItem.titlePicture || null,
        previewText: translation?.preview_text || '',
        bodyText: translation?.body_text || '',
        formattedDate,
        formattedAuthor,
    };
}
