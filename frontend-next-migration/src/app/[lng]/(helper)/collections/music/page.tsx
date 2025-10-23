import { withMetadataGenerator, withPageData } from '@/app/_helpers';
import { _getPage } from './_getPage';
import MusicCollectionsPage from '@/preparedPages/MusicCollectionsPages/ui/MusicCollectionsPage';

export const generateMetadata = withMetadataGenerator(_getPage);
export default withPageData(MusicCollectionsPage, _getPage);
