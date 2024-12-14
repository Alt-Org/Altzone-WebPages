import { withPageData, withMetadataGenerator } from '@/app/_helpers';
import { _getPage } from './_getPage';
import { FurnitureOneSetPage } from '@/preparedPages/FurniturePages';

export const generateMetadata = withMetadataGenerator(_getPage);

export default withPageData(FurnitureOneSetPage, _getPage);
