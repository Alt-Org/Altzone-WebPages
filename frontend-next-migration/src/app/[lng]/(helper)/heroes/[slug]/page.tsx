import { HeroPage as PreparedHeroPage } from '@/preparedPages/HeroesPages';
import { _getPage } from './_getPage';
import { withMetadataGenerator, withPageData } from '@/app/_helpers';

export const generateMetadata = withMetadataGenerator(_getPage);
export default withPageData(PreparedHeroPage, _getPage);
