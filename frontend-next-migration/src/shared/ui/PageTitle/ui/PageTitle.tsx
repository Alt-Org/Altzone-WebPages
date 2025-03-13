'use-client';
import cls from './PageTitle.module.scss';

interface Search {
    className?: string;
}

interface PageTitleProps {
    titleText: string;
    searchVisible?: boolean;
}

const PageTitle = ({ titleText, searchVisible = false }: PageTitleProps) => {
    return (
        <div className={cls.ContentAlignBox}>
            <div className={cls.ContentAlignBoxLeftBox} />
            <div className={cls.ContentAlignBoxRightBox}>
                {/* Title */}
                <h1>{titleText}</h1>
            </div>
            {searchVisible && (
                <div className={cls.SearchContainer}>
                    <input
                        type="text"
                        style={{ width: '100%' }}
                    />
                </div>
            )}
        </div>
    );
};

export default PageTitle;
