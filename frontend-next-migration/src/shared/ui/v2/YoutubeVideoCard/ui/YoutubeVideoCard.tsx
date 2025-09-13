import React from 'react';
import cls from './YoutubeVideoCard.module.scss';

interface YoutubeVideoCardProps {
    title: string;
    artist: string;
    youtubeId?: string;
    className?: string;
    style?: React.CSSProperties;
}

const YoutubeVideoCard: React.FC<YoutubeVideoCardProps> = ({
    title,
    artist,
    youtubeId,
    className,
    style,
}) => (
    <div
        className={`${cls.VideoCard} ${className || ''}`}
        style={style}
    >
        <div className={cls.IframeWrapper}>
            <iframe
                width="100%"
                height="auto"
                src={`https://www.youtube.com/embed/${youtubeId}?showinfo=0&rel=0`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={cls.VideoIframe}
            />
        </div>
        <div className={cls.TextContainer}>
            <h3 className={cls.Title}>{title}</h3>
            <p className={cls.Artist}>{artist}</p>
        </div>
    </div>
);

export default YoutubeVideoCard;
