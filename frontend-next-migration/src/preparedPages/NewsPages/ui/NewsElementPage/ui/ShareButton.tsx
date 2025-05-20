//Author: Sauli
'use client';
import { useState } from 'react';
import styles from './ShareButton.module.scss';
import { toast } from 'react-toastify';

const ShareButton = () => {
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            toast.success('Link copied!');
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            toast.error('Failed to copy link');
        }
    };

    return (
        <button
            className={styles.shareButton}
            onClick={handleShare}
            aria-label="Share this news article"
        >
            <img
                src="/icons/ShareIcon.svg"
                alt="Share icon"
                width={24}
                height={24}
            />
        </button>
    );
};

export default ShareButton;
