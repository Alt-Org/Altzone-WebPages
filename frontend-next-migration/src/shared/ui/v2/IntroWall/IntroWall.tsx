import cls from './IntroWall.module.scss';
import tile2 from '@/shared/assets/images/backgrounds/background_tile2.jpg';
import tile3 from '@/shared/assets/images/backgrounds/background_tile3.jpg';
import tile from '@/shared/assets/images/backgrounds/background_tile.jpg';
import Image, { StaticImageData } from 'next/image';
import { useEffect, useState } from 'react';

export default function IntroWall() {
    const amount = 8 * 5;
    const [wall, setWall] = useState<StaticImageData[]>([]);
    const [dropping, setDropping] = useState<boolean>(false);

    useEffect(() => {
        const wallArray = [];
        for (let i = 0; i < amount; i++) {
            wallArray.push(randomImg());
        }
        setWall(wallArray);
        const timer = setTimeout(() => setDropping(true), 1800);
        return () => {
            clearTimeout(timer);
        };
    }, []);

    const randomInt = (min: number, max: number): number => {
        return Math.floor(Math.random() * (max - min)) + min;
    };

    const randomImg = () => {
        const number = Math.floor(Math.random() * 3) + 1;
        if (number === 1) {
            return tile;
        } else if (number === 2) {
            return tile2;
        } else {
            return tile3;
        }
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
                    width={randomInt(230, 300)}
                    height={300}
                    className={`${cls.tile} ${cls[`drop-${index}`]}`}
                    style={{ '--tile-tilt': `${randomInt(-30, 30)}deg` } as React.CSSProperties}
                />
            ))}
        </div>
    );
}
