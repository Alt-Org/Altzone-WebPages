export { MyClanPage as default } from '@/preparedPages/ClanPages';

import { withMetadataGenerator } from '@/app/_helpers';
import { _getPage } from '../_getPage';

export const generateMetadata = withMetadataGenerator(_getPage);
