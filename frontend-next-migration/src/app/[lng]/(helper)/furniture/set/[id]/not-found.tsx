'use client';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { getRouteAllFurnitureSetsPage } from '@/shared/appLinks/RoutePaths';
import { useClientTranslation, useServerTranslation } from '@/shared/i18n';

function NotFound() {
    const { t } = useClientTranslation('furnitureinfo');

    return (
        <>
            <h1>{t('set-not-found')}</h1>
            <AppLink to={getRouteAllFurnitureSetsPage()}>{`<-- ${t('text-back')}`}</AppLink>
        </>
    );
}

export default NotFound;
