import { withPageData, createMetadataGenerator } from '@/app/_helpers';
import { _getPage } from './_getPage';
import { FurnitureSearchPage } from '@/preparedPages/FurniturePages';

export const generateMetadata = createMetadataGenerator(_getPage);
export default withPageData(FurnitureSearchPage, _getPage);
