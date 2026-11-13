'use client';
import { ComicReader } from '@/entities/Comic';
import useComicGallery from '../model/useComicGallery';
import cls from './ComicGallery.module.scss';

export const ComicGallery = () => {
    const { comics, isError } = useComicGallery();

    if (isError) {
        return <div>Server Error</div>;
    }

    return (
        <div className={cls.galleries}>
            {comics.map((comic) => (
                <ComicReader
                    cover={comic.cover}
                    followLastImage={comic.followLastImage}
                    key={comic.title}
                    sources={comic.sources}
                    //title={comic.title}
                />
            ))}
        </div>
    );
};
