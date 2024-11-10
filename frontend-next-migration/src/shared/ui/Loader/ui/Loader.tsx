import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Loader.module.scss';

interface LoaderProps {
    /**
     * Additional class name to apply to the Loader component.
     */
    className?: string;
}

/**
 * Loader component displays an animated loading indicator.
 *
 * @param {LoaderProps} props - Properties for the Loader component.
 * @returns JSX element representing the Loader.
 *
 * @example
 * ```tsx
 * import { useState, useEffect } from 'react';
 * import { Loader } from '@/components/Loader';
 *
 * const App = () => {
 *     const [isLoading, setIsLoading] = useState(true);
 *
 *     useEffect(() => {
 *         setTimeout(() => {
 *             setIsLoading(false);
 *         }, 3000);
 *     }, []);
 *
 *     return (
 *         <div>
 *             {isLoading ? (
 *                 <Loader className="custom-loader" />
 *             ) : (
 *                 <h1>Data has been loaded</h1>
 *             )}
 *         </div>
 *     );
 * };
 * ```
 */
export const Loader = ({ className = '' }: LoaderProps) => (
    <div className={classNames(cls.Loader, {}, [className])}>
        {/* <div className={cls.ldsRing}> */}
        <div />
        <div />
        <div />
        <div />
        {/* </div> */}
    </div>
);
