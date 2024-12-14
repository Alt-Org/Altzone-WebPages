import { ClanRoomSubPage as PreparedPage } from '@/preparedPages/ClanPages';
import { withMetadataGenerator, withPageData } from '@/app/_helpers';
import { _getPage } from './_getPage';

export const generateMetadata = withMetadataGenerator(_getPage);

export default withPageData(PreparedPage, _getPage);
