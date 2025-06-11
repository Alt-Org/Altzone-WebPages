import { useRandomCharacter } from '../../lib/useRandomCharacter';
import Image from 'next/image';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from '@/shared/ui/v2/Footer/ui/FooterDesktop/FooterDesktop.module.scss';

/**
 * RandomCharacter component for displaying an image of a random character.
 *
 * @returns {JSX.Element} A JSX element representing the RandomCharacter.
 *
 * @example
 * ```tsx
 * <RandomCharacter />
 */
export const RandomCharacter = () => {
    const { characterPath } = useRandomCharacter();

    if (!characterPath) {
        return <div>Loading...</div>;
    }

    return (
        <Image
            src={characterPath}
            alt="Random hero"
            className={classNames(cls.FooterImage)}
            width={200}
            height={200}
            style={{ width: 'auto', height: 'auto' }}
        />
    );
};
