import { ReactNode, CSSProperties } from 'react';
import bgPicture from '@/shared/assets/images/backgrounds/background.webp';

interface LayoutWithBackgroundProps {
    children: ReactNode;
    imagePath?: string;
    alt?: string;
    shouldBeLazyLoaded?: boolean;
    showBackground?: boolean;
}

/**
 * LayoutWithBackground renders a fixed full-viewport background texture
 * behind the application content.
 *
 * Responsibilities:
 * - Provides a global background layer using CSS `background-image`.
 * - Keeps background rendering separate from page/feature logic.
 *
 * Non-responsibilities:
 * - Does NOT render hero images or page-specific visuals.
 * - Does NOT control animations or page transitions.
 *
 * Notes:
 * - Background visibility is controlled via `showBackground`.
 * - This component is intended to be used at layout level.
 * - Route-based background logic should be handled by a wrapper
 *   (e.g. LayoutBackgroundController), not inside this component.
 *
 * @param children - Page or layout content rendered above the background.
 * @param imagePath - Optional background image path (defaults to main background texture).
 * @param alt - Accessible description for the background image.
 * @param shouldBeLazyLoaded - Reserved for future use (not applicable to CSS backgrounds).
 * @param showBackground - Enables or disables rendering of the background layer.
 */
const LayoutWithBackground = (props: LayoutWithBackgroundProps) => {
    const {
        children,
        imagePath = bgPicture.src,
        alt = 'Main-Page underground style background',
        showBackground = true,
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
            {showBackground && (
                <div
                    style={backgroundStyle}
                    role="img"
                    aria-label={alt}
                />
            )}
            <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
        </>
    );
};

export default LayoutWithBackground;
