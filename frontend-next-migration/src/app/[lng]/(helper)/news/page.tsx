import { withPageData, createMetadataGenerator } from '@/app/_helpers';
import { _getPage } from './_getPage';
import { NewsPage } from '@/preparedPages/NewsPages';

export const generateMetadata = createMetadataGenerator(_getPage);
export default withPageData(NewsPage, _getPage);
