import { Container } from '@/shared/ui/Container';
import cls from './PageTitle.module.scss';

interface PageTitleProps {
    titleText: string;
    searchVisible?: boolean;
}

/**
 * Displays h1 title and possibly a searchbar
 * @param param0 props
 * @returns ReactNode
 */

const PageTitle = ({ titleText, searchVisible = false }: PageTitleProps) => {
    return (
        <Container className={cls.PageTitleContainer}>
            <div className={cls.PageTitleLeft} />
            <div className={cls.PageTitle}>
                {/* Title */}
                <h1>{titleText}</h1>
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
