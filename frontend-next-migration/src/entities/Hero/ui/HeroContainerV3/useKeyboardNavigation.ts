import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  leftArrowLink: string;
  rightArrowLink: string;
  xLink: string;
};

const useKeyboardNavigation = (props: Props) => {
  const { leftArrowLink, rightArrowLink, xLink } = props;

  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.keyCode) {
        case 37: // Left Arrow Key
          router.push(leftArrowLink);
          break;
        case 39: // Right Arrow Key
          router.push(rightArrowLink);
          break;
        case 27: // Escape Key
          router.push(xLink);
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [router, leftArrowLink, rightArrowLink, xLink]);
};

export default useKeyboardNavigation;
