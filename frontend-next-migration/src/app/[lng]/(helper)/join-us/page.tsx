import { JoinUsPage } from '@/preparedPages/JoinUsPage';
import { withPageData, createMetadataGenerator } from '@/app/_helpers';
import { _getPage } from './_getPage';

export const generateMetadata = createMetadataGenerator(_getPage);
export default withPageData(JoinUsPage, _getPage);
