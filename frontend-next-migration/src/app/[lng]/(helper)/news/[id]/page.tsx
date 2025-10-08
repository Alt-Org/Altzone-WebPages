import { withMetadataGenerator, withPageData } from '@/app/_helpers';
import { NewsElementPage as PreparedNewsElementPage } from '@/preparedPages/NewsPages';
import { _getPage } from './_getPage';

export const generateMetadata = withMetadataGenerator(_getPage);
export default withPageData(PreparedNewsElementPage, _getPage);
