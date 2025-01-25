import { useParams, useRouter } from 'next/navigation';
import { getRouteGalleryCategoryPage } from '@/shared/appLinks/RoutePaths';
import {
    getLanguageCode,
    useGetDirectusGalleryImages,
    getCategoryTranslation,
    Category,
} from '@/entities/Gallery';
import { useEffect, useState } from 'react';
import { useClientTranslation } from '@/shared/i18n';
import cls from './GalleryNavMenuAsSidebar.module.scss';

export interface SidebarProps {
    sidebarVisible: boolean;
    setSidebarVisible: (visible: boolean) => void;
}

const GalleryNavMenuAsSidebar = (props: SidebarProps) => {
    const params = useParams();
    const router = useRouter();
    const lng = params.lng as string;
    const currentCategory = params.category as string;
    const language = getLanguageCode(lng);
    const { categories } = useGetDirectusGalleryImages(language);
    const allCategory = lng === 'en' ? 'all' : 'kaikki';
    const [selectedCategory, setSelectedCategory] = useState(currentCategory || allCategory);
    const { t } = useClientTranslation('picture-galleries');
    const { sidebarVisible, setSidebarVisible } = props;

    useEffect(() => {
        const category = findCorrectCategory(categories);

        if (!category) {
            setSelectedCategory(allCategory);
        } else {
            setSelectedCategory(currentCategory);
        }
    }, [categories, currentCategory]);

    useEffect(() => {
        const category = findCorrectCategory(categories);

        if (category) {
            const translatedName = getCategoryTranslation(category.translations, language);

            if (translatedName && translatedName !== currentCategory) {
                handleRouteChange(translatedName);
            }
        } else {
            setSelectedCategory(allCategory);
        }
    }, [categories, lng]);

    const findCorrectCategory = (categories: Category[]) => {
        if (!categories) return null;
        const category = categories.find((cat) =>
            cat.translations.some((t) => t.name === currentCategory),
        );
        return category ? category : null;
    };

    const handleRouteChange = (category: string) => {
        const newPath = getRouteGalleryCategoryPage(category);
        router.replace(newPath);
        setSelectedCategory(category);
    };

    const getCategory = (category: Category, index: number) => {
        const translatedCategory = getCategoryTranslation(category.translations, language);

        if (sidebarVisible) {
            return (
                <div
                    key={index}
                    onClick={() => handleRouteChange(translatedCategory)}
                    className={cls.Category}
                    style={
                        selectedCategory === translatedCategory
                            ? { color: 'var(--secondary-color)' }
                            : {}
                    }
                >
                    {translatedCategory.charAt(0).toUpperCase() +
                        translatedCategory.slice(1).replace('-', ' ')}
                </div>
            );
        } else {
            return (
                <div
                    key={index}
                    className={cls.Category}
                    style={
                        selectedCategory === translatedCategory
                            ? { color: 'var(--secondary-color)' }
                            : {}
                    }
                >
                    {translatedCategory.charAt(0).toUpperCase() +
                        translatedCategory.slice(1).replace('-', ' ')}
                </div>
            );
        }
    };

    const getList = (
        <div className={cls.Text}>
            <h2>{t('category-menu-title')}</h2>

            <div
                className={cls.Category}
                onClick={() => handleRouteChange(allCategory)}
                style={selectedCategory === allCategory ? { color: 'var(--secondary-color)' } : {}}
            >
                {allCategory.charAt(0).toUpperCase() + allCategory.slice(1)}
            </div>

            {categories.map((cat, index) => getCategory(cat, index))}
        </div>
    );

    return (
        <div className={cls.Box}>
            <div
                className={cls.Arrow}
                onClick={() => setSidebarVisible(!sidebarVisible)}
            >
                {sidebarVisible ? '<' : '>'}
            </div>
            {getList}
        </div>
    );
};

export default GalleryNavMenuAsSidebar;
