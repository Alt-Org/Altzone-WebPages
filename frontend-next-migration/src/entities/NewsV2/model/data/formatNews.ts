'use client';
import { News } from '@/entities/NewsV2/model/types/types';

export function formatNews(newsArray: News[] = [], lngCode: string) {
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

    return {
        id: newsItem.id,
        date: newsItem.date,
        title: translation?.title || '',
        titlePicture: newsItem.titlePicture || null,
        previewText: translation?.preview_text || '',
        bodyText: translation?.body_text || '',
        newsBody: translation?.news_body || null, // WYSIWYG field
        author: newsItem?.author || 'Anonymous',
    };
}
