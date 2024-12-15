import { MainPage } from '@/preparedPages/MainPage';
import { _getPage } from './_getPage';
import { withPageData, withMetadataGenerator } from '@/app/_helpers';

export const generateMetadata = withMetadataGenerator(_getPage);
export default withPageData(MainPage, _getPage);
