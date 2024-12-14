import { withPageData } from '@/app/_helpers';
import { _getPage } from './_getPage';
import { FurnitureOneSetPage } from '@/preparedPages/FurniturePages';
import { withMetadataGenerator } from '@/app/_helpers/createMetadataGenerator';

export const generateMetadata = withMetadataGenerator(_getPage);

export default withPageData(FurnitureOneSetPage, _getPage);
