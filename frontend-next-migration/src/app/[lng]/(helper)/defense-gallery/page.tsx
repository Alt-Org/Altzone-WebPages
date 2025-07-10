import { HeroesPage, HeroesPageProps } from '@/preparedPages/HeroesPages';
import { withPageData, withMetadataGenerator } from '@/app/_helpers';
import { _getPage } from './_getPage';

export const generateMetadata = withMetadataGenerator(_getPage);
export default withPageData<HeroesPageProps>(HeroesPage, _getPage);
