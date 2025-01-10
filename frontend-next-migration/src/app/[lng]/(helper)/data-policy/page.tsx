import { DataPolicyPage } from '@/preparedPages/DataPolicyPage';
import { withMetadataGenerator, withPageData } from '@/app/_helpers';
import { _getPage } from './_getPage';

export const generateMetadata = withMetadataGenerator(_getPage);
export default withPageData(DataPolicyPage, _getPage);
