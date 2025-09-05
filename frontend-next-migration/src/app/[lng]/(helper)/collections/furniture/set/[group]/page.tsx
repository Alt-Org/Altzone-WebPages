import { SingleFurnitureCollectionPage } from '@/preparedPages/FurnitureCollectionsPages';
import { withPageData, withMetadataGenerator } from '@/app/_helpers';
import { _getPage } from './_getPage';

export const generateMetadata = withMetadataGenerator(_getPage);
export default withPageData(SingleFurnitureCollectionPage, _getPage);
