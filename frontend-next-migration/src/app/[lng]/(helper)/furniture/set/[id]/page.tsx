import { withPageData, createMetadataGenerator } from '@/app/_helpers';
import { _getPage } from './_getPage';
import { FurnitureSetPage } from '@/preparedPages/FurniturePages';

export const generateMetadata = createMetadataGenerator(_getPage);
export default withPageData(FurnitureSetPage, _getPage);
