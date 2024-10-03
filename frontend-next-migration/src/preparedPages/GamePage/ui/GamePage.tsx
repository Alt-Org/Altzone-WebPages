import { AppExternalLinks } from '@/shared/appLinks/appExternalLinks';
import cls from './GamePage.module.scss';
import Iframe from 'react-iframe';

export default function GamePage() {
  return (
    <div className={cls.GamePage}>
      <div className={cls.IframeContainer}>
        <Iframe
          url={AppExternalLinks.webgl}
          className={cls.Iframe}
          allowFullScreen
          scrolling='no'
        />
      </div>
    </div>
  );
}
