import { PitchaamoPage } from '@/preparedPages/PitchaamoPage';
import { withPageData, withMetadataGenerator } from '@/app/_helpers';
import { _getPage } from './_getPage';

export const generateMetadata = withMetadataGenerator(_getPage);
export default withPageData(PitchaamoPage, _getPage);
