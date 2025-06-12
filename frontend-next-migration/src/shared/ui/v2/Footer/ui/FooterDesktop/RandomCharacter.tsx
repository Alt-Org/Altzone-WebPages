import { useRandomCharacter } from '@/shared/lib/hooks/useRandomCharacter';
import Image from 'next/image';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from '@/shared/ui/v2/Footer/ui/FooterDesktop/FooterDesktop.module.scss';

interface RandomCharacterProps {
    size?: number | string;
}

/**
 * RandomCharacter component for displaying an image of a random character.
 *
 * @param {RandomCharacterProps} props - The props for the component
 * @param {number | string} [props.size] - The size of the character image
 * @returns {JSX.Element} A JSX element representing the RandomCharacter.
 *
 * @example
 * ```tsx
 * <RandomCharacter />
 * <RandomCharacter size={256} />
 * ```
 */
export const RandomCharacter = ({ size }: RandomCharacterProps) => {
    const { characterPath, size: hookSize } = useRandomCharacter({ size });

    if (!characterPath) {
        return <div>Loading...</div>;
    }

    const imageSize = typeof hookSize === 'string' ? hookSize : `${hookSize}px`;

    return (
        <Image
            src={characterPath}
            alt="Random hero"
            className={classNames(cls.FooterImage)}
            width={typeof hookSize === 'number' ? hookSize : 200}
            height={typeof hookSize === 'number' ? hookSize : 200}
            style={{
                width: imageSize,
                height: imageSize,
                objectFit: 'contain',
            }}
        />
    );
};
