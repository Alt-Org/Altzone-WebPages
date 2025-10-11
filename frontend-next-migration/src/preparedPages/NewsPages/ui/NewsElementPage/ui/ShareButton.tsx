'use client';
import Image from 'next/image';
import { ReactNode } from 'react';
import styles from './ShareButton.module.scss';
import { toast } from 'react-toastify';
import ShareIcon from '@/shared/assets/icons/ShareIcon.svg';

interface ShareButtonProps {
    children?: ReactNode;
}

/**
 * ShareButton component renders a button that copies the current page URL
 * to the clipboard and shows a success or error toast notification.
 *
 * @component
 * @param {ShareButtonProps} props - Optional children to render inside the button.
 * @returns {JSX.Element} A button element with a share icon and optional label.
 */
const ShareButton = ({ children }: ShareButtonProps): JSX.Element => {
    /**
     * Handles the share action by copying the current URL to the clipboard.
     * Displays a toast notification on success or failure.
     *
     * @async
     * @returns {Promise<void>}
     * @throws {Error} If clipboard access fails or user blocks permission.
     */
    const handleShare = async (): Promise<void> => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            toast.success('Link copied!');
        } catch {
            toast.error('Failed to copy link');
        }
    };

    return (
        <button
            className={styles.shareButton}
            onClick={handleShare}
            aria-label="Share this news article"
        >
            <Image
                src={ShareIcon}
                alt="Login Icon"
            />
            {children}
        </button>
    );
};

export default ShareButton;
