import { HeroPage as PreparedHeroPage, HeroPageProps } from '@/preparedPages/HeroesPages';
import { _getPage } from './_getPage';
import { withMetadataGenerator, withPageData } from '@/app/_helpers';

export const generateMetadata = withMetadataGenerator(_getPage);
export default withPageData<HeroPageProps>(PreparedHeroPage, _getPage);
