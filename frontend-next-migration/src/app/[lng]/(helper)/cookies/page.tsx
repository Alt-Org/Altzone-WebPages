import { CookiesPage } from '@/preparedPages/CookiesPage';
import { withPageData, withMetadataGenerator } from 'src/app/_helpers';
import { _getPage } from './_getPage';

export const generateMetadata = withMetadataGenerator(_getPage);
export default withPageData(CookiesPage, _getPage);
