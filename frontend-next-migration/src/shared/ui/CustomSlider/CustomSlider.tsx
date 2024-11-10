import { ReactNode, useRef } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './CustomSlider.module.scss';

type Props = {
    className?: string;
    children: ReactNode;
};

/**
 * CustomSlider component to create a horizontally scrollable container.
 *
 * @param {Props} props - The properties of the component.
 * @returns The rendered CustomSlider component.
 *
 * @example
 * ```tsx
 * const news = [{ id: 1, title: 'News 1', bodyPreview: 'Body 1', date: '2024-01-01' }, ...];
 *
 * <CustomSlider className="additional-class">
 *   {news.map(item => (
 *     <NewsCard
 *       bodyLength={200}
 *       key={item.id}
 *       title={item.title}
 *       bodyPreview={item.bodyPreview}
 *       date={item.date}
 *       id={item.id}
 *     />
 *   ))}
 * </CustomSlider>
 * ```
 */
export const CustomSlider = ({ className = '', children }: Props) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleScrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: 3000,
                behavior: 'smooth',
            });
        }
    };

    const handleScrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: -3000,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className={classNames(cls.CustomSlider, {}, [className])}>
            <div
                className={cls.scrollLeft}
                onClick={handleScrollLeft}
            >
                <i>{'←'}</i>
            </div>

            <div
                className={classNames(cls.Cards, {}, [])}
                ref={scrollRef}
            >
                <div className={cls.CardContainer}>{children}</div>
            </div>

            <div
                className={cls.scrollRight}
                onClick={handleScrollRight}
            >
                <i>{'→'}</i>
            </div>
        </div>
    );
};
