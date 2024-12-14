import { _getPage } from './_getPage';
import { MembersPage } from '@/preparedPages/MembersPage';
import { withPageData, withMetadataGenerator } from '@/app/_helpers';

export const generateMetadata = withMetadataGenerator(_getPage);
export default withPageData(MembersPage, _getPage);
