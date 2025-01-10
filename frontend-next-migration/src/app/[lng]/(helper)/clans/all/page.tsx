import { ClanAllSubPage } from '@/preparedPages/ClanPages';
import { withPageData, withMetadataGenerator } from '@/app/_helpers';
import { _getPage } from './_getPage';

export const generateMetadata = withMetadataGenerator(_getPage);
export default withPageData(ClanAllSubPage, _getPage);
