import { AuthRegisterPage } from '@/preparedPages/AuthPages';
import { withPageData, withMetadataGenerator } from '@/app/_helpers';
import { _getPage } from './_getPage';

export const generateMetadata = withMetadataGenerator(_getPage);
export default withPageData(AuthRegisterPage, _getPage);
