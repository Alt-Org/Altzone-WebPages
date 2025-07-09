'use client';
import { useClientTranslation } from '@/shared/i18n';

export default function NotFound() {
    const { t } = useClientTranslation('news');

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '240px',
            }}
        >
            <h2>{t('not-found-category-title')}</h2>
        </div>
    );
}
