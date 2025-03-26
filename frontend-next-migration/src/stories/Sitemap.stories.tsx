import React from 'react';
import sitemap from '../app/sitemap';

export default {
    title: 'Sitemap',
};

export const SitemapStory = () => {
    const sitemapData = sitemap();

    const containerStyle: React.CSSProperties = {
        fontFamily: 'monospace',
        whiteSpace: 'pre-wrap',
        padding: '16px',
        backgroundColor: '#ffffff',
        color: '#333333',
    };

    return (
        <div style={containerStyle}>
            <h2>Sitemap</h2>
            <pre>{JSON.stringify(sitemapData, null, 2)}</pre>
        </div>
    );
};
