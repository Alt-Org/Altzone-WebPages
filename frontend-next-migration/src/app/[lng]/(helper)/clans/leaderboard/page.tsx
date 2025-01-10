import { withPageData, withMetadataGenerator } from '@/app/_helpers';
import { _getPage } from './_getPage';
import { ClanLeaderBoardPage } from '@/preparedPages/ClanPages';

export const generateMetadata = withMetadataGenerator(_getPage);
export default withPageData(ClanLeaderBoardPage, _getPage);
