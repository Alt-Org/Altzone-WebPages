import cls from './IntroWall.module.scss';
import tile2 from '@/shared/assets/images/backgrounds/background_tile2.webp';
import tile3 from '@/shared/assets/images/backgrounds/background_tile3.webp';
import tile4 from '@/shared/assets/images/backgrounds/background_tile4.webp';
import tile1 from '@/shared/assets/images/backgrounds/background_tile1.webp';
import Image, { StaticImageData } from 'next/image';
import { useEffect, useState } from 'react';

/**
 * IntroWall component displays an animated crumbling wall.
 *
 * @returns JSX element representing the IntroWall.
 *
 * @example
 *
 *  <IntroWall />
 */

export default function IntroWall() {
    const amount = 8 * 12;
    const [wall, setWall] = useState<StaticImageData[]>([]);
    const tiles = [tile1, tile2, tile3, tile4];

    useEffect(() => {
        const wallArray = [];
        for (let i = 0; i < amount; i++) {
            wallArray.push(randomImg());
        }
        setWall(wallArray);
    }, []);

    const randomInt = (min: number, max: number): number => {
        return Math.floor(Math.random() * (max - min)) + min;
    };

    const randomImg = (): StaticImageData => {
        const number = Math.floor(Math.random() * 4);
        return tiles[number];
    };

    return (
        <div
            className={cls.wall}
            data-testid="TestWall"
        >
            {wall.map((_, index) => (
                <Image
                    key={index}
                    src={wall[index]}
                    alt="tile"
                    width={0}
                    height={0}
                    loading="eager"
                    className={`${cls.tile} ${cls[`drop-${index}`]}`}
                    style={{ '--tile-tilt': `${randomInt(-50, 50)}deg` } as React.CSSProperties}
                />
            ))}
        </div>
    );
}
