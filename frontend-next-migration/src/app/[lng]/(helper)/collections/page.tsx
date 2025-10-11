import { CollectionsPage } from '@/preparedPages/CollectionsPage';
import { withPageData, withMetadataGenerator } from '@/app/_helpers';
import { _getPage } from './_getPage';

export const generateMetadata = withMetadataGenerator(_getPage);
export default withPageData(CollectionsPage, _getPage);
