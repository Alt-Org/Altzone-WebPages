'use client';
import { FC } from 'react';
// @ts-ignore
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

interface YouTubeFacadeProps {
    previewVideoYoutube: string;
    altText?: string;
}

const YouTubeFacade: FC<YouTubeFacadeProps> = ({ previewVideoYoutube, altText }) => {
    const extractVideoId = (url: string) => {
        const regex = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=))([\w-]{11})/;
        const match = url.match(regex);
        return match ? match[1] : '';
    };

    const videoId = extractVideoId(previewVideoYoutube);
    return (
        <LiteYouTubeEmbed
            poster="maxresdefault"
            id={videoId}
            title={altText}
        />
    );
};

export default YouTubeFacade;
