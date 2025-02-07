import { HeroDevelopmentPage as PreparedHeroDevelopmentPage } from '@/preparedPages/HeroDevelopmentPage';
import { _getPage } from './_getPage';
import { withMetadataGenerator, withPageData } from '@/app/_helpers';

export const generateMetadata = withMetadataGenerator(_getPage);
export default withPageData(PreparedHeroDevelopmentPage, _getPage);
