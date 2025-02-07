import { TeachersPage } from '@/preparedPages/TeachersPage';
import { withPageData, createMetadataGenerator } from '@/app/_helpers';
import { _getPage } from './_getPage';

export const generateMetadata = createMetadataGenerator(_getPage);
export default withPageData(TeachersPage, _getPage);
