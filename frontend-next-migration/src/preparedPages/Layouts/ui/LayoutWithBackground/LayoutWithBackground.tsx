import { ReactNode, CSSProperties } from 'react';
import bgPicture from '@/shared/assets/images/backgrounds/background.webp';

interface LayoutWithBackgroundProps {
    children: ReactNode;
    imagePath?: string;
    alt?: string;
    shouldBeLazyLoaded?: boolean;
}

/**
 * Layout component that provides a full-page background image.
 * Uses CSS background-image for optimal image quality and performance.
 *
 * @param children - The content to render over the background
 * @param imagePath - Path to the background image (defaults to main background)
 * @param alt - Alt text for the background image (for accessibility)
 * @param shouldBeLazyLoaded - Whether to lazy load the background image (not used with CSS background)
 */
const LayoutWithBackground = (props: LayoutWithBackgroundProps) => {
    const {
        children,
        imagePath = bgPicture.src,
        alt = 'Main-Page underground style background',
    } = props;

    const backgroundStyle: CSSProperties = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: -1,
        backgroundImage: `url("${imagePath}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
    };

    return (
        <>
            <div
                style={backgroundStyle}
                role="img"
                aria-label={alt}
            />
            <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
        </>
    );
};

export default LayoutWithBackground;
