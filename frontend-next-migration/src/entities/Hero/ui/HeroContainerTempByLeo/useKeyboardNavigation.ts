import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  leftArrowLink: string;
  rightArrowLink: string;
  xLink: string;
};

const useKeyboardNavigation = (props: Props) => {
  const { leftArrowLink, rightArrowLink, xLink } = props;

  const router = useRouter();

  const leftArrowKey = 37;
  const rightArrowKey = 39;
  const escapeKey = 27;


  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.keyCode) {
        case leftArrowKey: // Left Arrow Key
          router.push(leftArrowLink);
          break;
        case rightArrowKey: // Right Arrow Key
          router.push(rightArrowLink);
          break;
        case escapeKey: // Escape Key
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
