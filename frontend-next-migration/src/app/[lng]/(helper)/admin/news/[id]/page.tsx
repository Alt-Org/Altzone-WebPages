import { withMetadataGenerator, withPageData } from '@/app/_helpers';
import AdminNewsElementPage from '@/preparedPages/NewsPages/ui/NewsElementPage/ui/AdminNewsElementPage.async';
import { _getPage } from './_getPage';

export const generateMetadata = withMetadataGenerator(_getPage);
export default withPageData(AdminNewsElementPage, _getPage);
