import { useClientTranslation } from '@/shared/i18n';
import { useParams, usePathname } from 'next/navigation';
import { NavMenuWithDropdowns } from '@/shared/ui/NavMenuWithDropdownsV2';

interface CollectionsNavMenuAsDropdownProps {
    className?: string;
}

const CollectionsNavMenuAsDropdown: React.FC<CollectionsNavMenuAsDropdownProps> = ({
    className,
}) => {
    const { t } = useClientTranslation('collections');

    const pathname = usePathname();
    const params = useParams();
    const lng = params.lng as string;

    const pathWithoutLang = pathname.replace(`/${lng}`, '');
    return (
        <NavMenuWithDropdowns
            className={className}
            openByDefault={true}
            dropdownItems={[
                {
                    elementText: t('all'),
                    link: {
                        path: `/collections`,
                        isExternal: false,
                    },
                    active: pathWithoutLang === `/collections`,
                },
                {
                    title: t('avatar'),
                    elements: [
                        {
                            id: '1',
                            elementText: t('head'),
                            link: {
                                path: '/collections/avatar/head',
                                isExternal: false,
                            },
                            active: pathWithoutLang === '/collections/avatar/head',
                        },
                        {
                            id: '2',
                            elementText: t('hair'),
                            link: {
                                path: '/collections/avatar/hair',
                                isExternal: false,
                            },
                            active: pathWithoutLang === '/collections/avatar/hair',
                        },
                        {
                            id: '3',
                            elementText: t('eyes'),
                            link: {
                                path: '/collections/avatar/eyes',
                                isExternal: false,
                            },
                            active: pathWithoutLang === '/collections/avatar/eyes',
                        },
                        {
                            id: '4',
                            elementText: t('nose'),
                            link: {
                                path: '/collections/avatar/nose',
                                isExternal: false,
                            },
                            active: pathWithoutLang === '/collections/avatar/nose',
                        },
                        {
                            id: '5',
                            elementText: t('mouth'),
                            link: {
                                path: '/collections/avatar/mouth',
                                isExternal: false,
                            },
                            active: pathWithoutLang === '/collections/avatar/mouth',
                        },
                        {
                            id: '6',
                            elementText: t('body'),
                            link: {
                                path: '/collections/avatar/body',
                                isExternal: false,
                            },
                            active: pathWithoutLang === '/collections/avatar/body',
                        },
                        {
                            id: '7',
                            elementText: t('hands'),
                            link: {
                                path: '/collections/avatar/hands',
                                isExternal: false,
                            },
                            active: pathWithoutLang === '/collections/avatar/hands',
                        },
                        {
                            id: '8',
                            elementText: t('legs'),
                            link: {
                                path: '/collections/avatar/legs',
                                isExternal: false,
                            },
                            active: pathWithoutLang === '/collections/avatar/legs',
                        },
                    ],
                },
                {
                    title: t('furniture'),
                    elements: [
                        {
                            id: '9',
                            elementText: t('collections'),
                            link: { path: '/collections/furniture', isExternal: false },
                            active: pathWithoutLang === '/collections/furniture',
                        },
                        {
                            id: '10',
                            elementText: t('furniture'),
                            link: {
                                path: '/collections/furniture/all',
                                isExternal: false,
                            },
                            active: pathWithoutLang === '/collections/furniture/all',
                        },
                    ],
                },
                {
                    title: t('music'),
                    elements: [
                        {
                            id: '11',
                            elementText: t('all'),
                            link: { path: '/collections/music', isExternal: false },
                            active: pathWithoutLang === '/collections/music',
                        },
                        {
                            id: '12',
                            elementText: t('battle'),
                            link: {
                                path: '/collections/music/battle',
                                isExternal: false,
                            },
                            active: pathWithoutLang === '/collections/music/battle',
                        },
                        {
                            id: '13',
                            elementText: t('jukebox'),
                            link: {
                                path: '/collections/music/jukebox',
                                isExternal: false,
                            },
                            active: pathWithoutLang === '/collections/music/jukebox',
                        },
                    ],
                },
            ]}
            title={t('categories')}
        />
    );
};

export default CollectionsNavMenuAsDropdown;
