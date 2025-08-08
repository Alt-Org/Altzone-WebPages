import { SingleDefensePage as PreparedSingleDefensePage } from '@/preparedPages/DefenseGalleryPages';
import { _getPage } from './_getPage';
import { withMetadataGenerator, withPageData } from '@/app/_helpers';

export const generateMetadata = withMetadataGenerator(_getPage);
export default withPageData(PreparedSingleDefensePage, _getPage);
