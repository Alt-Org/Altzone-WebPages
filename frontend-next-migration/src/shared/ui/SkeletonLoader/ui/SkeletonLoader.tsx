import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./SkeletonLoader.module.scss";

interface SkeletonLoaderProps {
    numberOfRows?: number;
    sections?: number;
    className?: string;
}

/**
 * SkeletonLoader component displays an animated skeleton loader indicator with default of 4 skeleton rows.
 *
 * @param {SkeletonLoaderProps} props - Properties for the SkeletonLoader component.
 * @returns JSX element representing the SkeletonLoader.
 */

export const SkeletonLoader = ({
    numberOfRows = 4, // Default number of rows.
    className = ''
}: SkeletonLoaderProps) => {
    // Create an array based on the number of rows to render multiple skeletons.
    const skeletonRows = Array(numberOfRows).fill(0);

    return (
        <div className={classNames(cls.skeletonContainer, {}, [className])}>
            {skeletonRows.map((_, index) => (
                <div
                    key={index}
                    className={classNames(cls.skeleton, {},)}
                />
            ))}
        </div>
    );
};

/**
 * SkeletonLoaderWithHeader component displays an animated skeleton loader indicator with default of 1 section of skeleton loaders with 1 header and 3 rows.
 *
 * @param {SkeletonLoaderProps} props - Properties for the SkeletonLoader component.
 * @returns JSX element representing the SkeletonLoader.
 */


export const SkeletonLoaderWithHeader = ({
    sections = 1, // Default number of sections.
    className = ''
}: SkeletonLoaderProps) => {
    // Create an array based on the number of sections to render multiple skeleton sections.
    const skeletonSections = Array(sections).fill(0);

    return (
        <div className={classNames(cls.skeletonContainer, {}, [className])}>
            {skeletonSections.map((_, sectionIndex) => (
                <>
                    <div className={classNames(cls.skeletonHeaderContainer, {})}>
                        <div
                            key={sectionIndex}
                            className={classNames(cls.skeletonHeader, {})}
                        />
                    </div>
                    <div className={classNames(cls.skeleton)} />
                    <div className={classNames(cls.skeleton)} />
                    <div className={classNames(cls.skeleton)} />
                </>
            ))}
        </div>
    );
};