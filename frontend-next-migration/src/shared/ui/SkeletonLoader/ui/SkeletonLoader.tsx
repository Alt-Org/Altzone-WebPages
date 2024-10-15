import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./SkeletonLoader.module.scss";
import React from "react";

interface SkeletonLoaderProps {
    numberOfRows?: number;
    sections?: number;
    className?: string;
}

/**
 * SkeletonLoader component displays an animated skeleton loading indicator with a configurable number of rows,
 * used to visually represent loading content.
 *
 * @param {Object} props - Properties for the SkeletonLoader component.
 * @param {number} [props.numberOfRows=4] - The number of skeleton rows to render. Defaults to 4 rows.
 * @param {string} [props.className=''] - Additional CSS class names to apply to the root container for custom styling.
 * @returns {JSX.Element} A JSX element representing the skeleton loader with the specified number of rows.
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
 * SkeletonLoaderWithHeader component displays a skeleton loading animation with a configurable number of sections,
 * each containing a header and three rows. Used as a placeholder to indicate loading state.
 *
 * @param {Object} props - Properties for the SkeletonLoader component.
 * @param {number} [props.sections=1] - The number of sections (each containing one header and three rows) to render.
 * @param {string} [props.className=''] - Additional CSS class names to apply to the root container for custom styling.
 * @returns {JSX.Element} A JSX element representing the skeleton loader with a header and rows.
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
                <React.Fragment key={sectionIndex}>
                    <div className={classNames(cls.skeletonHeaderContainer, {})}>
                        <div
                            key={sectionIndex}
                            className={classNames(cls.skeletonHeader, {})}
                        />
                    </div>
                    <div className={classNames(cls.skeleton)} />
                    <div className={classNames(cls.skeleton)} />
                    <div className={classNames(cls.skeleton)} />
                </React.Fragment>
            ))}
        </div>
    );
};