import { createPage } from '@/app/_helpers';
import { PictureGalleryPageProps } from '@/preparedPages/PictureGalleryPages';
import { useServerTranslation } from '@/shared/i18n';
import { AppExternalLinks } from '@/shared/appLinks/appExternalLinks';

export async function _getPage(lng: string) {
    const { t } = await useServerTranslation(lng, 'picture-galleries');
    return createPage<PictureGalleryPageProps>({
        buildPage: () => ({
            title: t("picture-galleries"),
            infoText: t("info-text"),
            socialsText: t("socials-text"),
            socialMediaLinks: [
                AppExternalLinks.igPost1,
                AppExternalLinks.igPost2,
                AppExternalLinks.fbPost1
            ],
            videoLink: AppExternalLinks.previewVideoYoutube,
            version: "full"
        }),
        buildSeo: () => ({
            title: t('head-title'),
            description: t('head-description'),
            keywords: t('head-keywords'),
        }),
    });
}
