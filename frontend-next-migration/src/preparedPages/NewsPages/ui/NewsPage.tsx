import { Navbar } from '@/widgets/Navbar';
import cls from './NewsPage.module.scss';
import { FeedbackSideButton } from '@/features/FeedbackByExternalSource';
import { classNames } from '@/shared/lib/classNames/classNames';
import Head from 'next/head';
import { envHelper } from '@/shared/const/envHelper';
import { RoutePaths } from '@/shared/appLinks/RoutePaths';
import { ComingSoon } from '@/widgets/ComingSoon';

const NewsPage = () => {
  return (
    <div className={classNames(cls.NewsPage)}>
      <Head>
        <title>Uutiset</title>
        <meta
          name='description'
          content='Lue uusimmat uutiset Altzonesta täällä.'
        />
        <meta
          name='keywords'
          content='altzone, uutiset, peliyhteisö, sarjakuvat, pelit'
        />
        <link
          rel='canonical'
          href={`${envHelper.appDomain}/${RoutePaths.NEWS}`}
        />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='Uutiset - Altzone' />
        <meta
          property='og:description'
          content='Lue uusimmat uutiset Altzonesta täällä.'
        />
        <meta
          property='og:url'
          content={`${envHelper.appDomain}/${RoutePaths.NEWS}`}
        />
      </Head>
      <FeedbackSideButton />
      <Navbar className={cls.navbar} />
      <ComingSoon lng={''} />{' '}
      {/* TODO: Remember to Remove ComingSoon component.*/}
    </div>
  );
};

export default NewsPage;
