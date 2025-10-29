<<<<<<< HEAD
import { SingleHeroPage } from '@/preparedPages/HeroesPages';
||||||| parent of 70b1b2b6 (fix: hero page after merge)
import { HeroPage as PreparedHeroPage } from '@/preparedPages/HeroesPages';
=======
import { HeroPage as PreparedHeroPage, HeroPageProps } from '@/preparedPages/HeroesPages';
>>>>>>> 70b1b2b6 (fix: hero page after merge)
import { _getPage } from './_getPage';
import { withMetadataGenerator, withPageData } from '@/app/_helpers';

export const generateMetadata = withMetadataGenerator(_getPage);
<<<<<<< HEAD
export default withPageData(SingleHeroPage, _getPage);
||||||| parent of 70b1b2b6 (fix: hero page after merge)
export default withPageData(PreparedHeroPage, _getPage);
=======
export default withPageData<HeroPageProps>(PreparedHeroPage, _getPage);
>>>>>>> 70b1b2b6 (fix: hero page after merge)
