import { Container } from '@/shared/ui/Container';
import cls from './PageTitle.module.scss';
import { usePathname } from 'next/navigation';
import { PageTitles } from '@/shared/ui/PageTitle/enum/PageTitle.enum';
import { useClientTranslation } from '@/shared/i18n';

interface PageTitleProps {
    titleText: string;
    searchVisible?: boolean;
    dynamicTitle?: string;
    alternate?: boolean;
}
/**
 * PageTitle component for displaying an H1 title and an optional search bar.
 *
 * This component displays a page title that can be either static (`titleText`) or dynamic (`dynamicTitle`).
 * - If `dynamicTitle` is provided, the title is determined based on the current route using `PageTitles` enums. `dynamicTitle` string is used to determine what I18N namespace is used upon translation.
 * - If `searchVisible` is `true`, a placeholder for a search bar is displayed.
 *
 * @param {Object} props - The component props.
 * @param {string} props.titleText - The static title to display.
 * @param {boolean} [props.searchVisible=false] - Whether to show the search bar.
 * @param {string} [props.dynamicTitle] - The dynamic namespace used to determine the title based on the current route. If not found, `titleText` is used as the fallback.
 * @param {string} [props.alternate=false] - If true, changes the styling of the PageTitle. Alternate should work better with layoutwithsidebars.
 * @returns {React.ReactNode} The rendered PageTitle component.
 * @example
 * //Dynamic PageTitle, where dynamicTitle='admin' is used to tell the component to seek t('adminTestTitle') from I18N admin.json.
 *  <PageTitle
 *       titleText={t('adminTestTitle')}
 *       searchVisible={false}
 *       dynamicTitle='admin'
 *  />
 * @example
 * //Static PageTitle, component uses the original titleText given to it.
 *  <PageTitle
 *       titleText={t('adminTestTitle')}
 *       searchVisible={false}
 *  />
 */

const PageTitle = ({
    titleText,
    searchVisible = false,
    dynamicTitle = '',
    alternate = false,
}: PageTitleProps) => {
    const { t } = useClientTranslation(dynamicTitle);

    const pathname = usePathname(); // Get current route, same logic as in NavMenuWithDropdowns.
    const pathSegments = pathname.split('/').filter(Boolean);
    const newPath = `/${pathSegments.slice(1, 4).join('/')}`;
    const PageTitleEnum = PageTitles[newPath as keyof typeof PageTitles] || titleText;

    const title = dynamicTitle ? PageTitleEnum : titleText;

    return alternate ? (
        <Container className={cls.PageTitleContainer}>
            <div className={cls.PageTitleAlt}>
                <h1>{dynamicTitle ? t(title) : titleText}</h1>
            </div>
            {searchVisible && (
                <div className={cls.SearchContainer}>
                    {/* placeholder for search */}
                    <p>Search</p>
                </div>
            )}
        </Container>
    ) : (
        <Container className={cls.PageTitleContainer}>
            <div className={cls.PageTitleLeft} />
            <div className={cls.PageTitle}>
                <h1>{dynamicTitle ? t(title) : titleText}</h1>
            </div>
            {searchVisible && (
                <div className={cls.SearchContainer}>
                    {/* placeholder for search */}
                    <p>Search</p>
                </div>
            )}
        </Container>
    );
};
export default PageTitle;
