import { useRandomCharacter } from '@/shared/lib/hooks/useRandomCharacter';
import Image from 'next/image';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from '@/shared/ui/v2/Footer/ui/FooterDesktop/FooterDesktop.module.scss';
import HannuHodari from '@/shared/assets/images/heros/hannu-hodari/hannu-hodari.png';

interface RandomCharacterProps {
    size?: number | string;
}

/**
 * RandomCharacter component for displaying a random character image.
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

    const imageSize = typeof hookSize === 'string' ? hookSize : `${hookSize}px`;
    const numericSize = typeof hookSize === 'number' ? hookSize : 200;

    return (
        <Image
            src={characterPath || HannuHodari}
            alt="Random hero character"
            className={classNames(cls.FooterImage)}
            width={numericSize}
            height={numericSize}
            style={{
                height: imageSize,
                width: 'auto',
                objectFit: 'contain',
            }}
            placeholder="empty"
            onError={(error) => {
                error.currentTarget.src = HannuHodari.src;
            }}
        />
    );
};
