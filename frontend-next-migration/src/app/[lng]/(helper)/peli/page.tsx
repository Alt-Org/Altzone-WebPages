import { GamePage } from '@/preparedPages/GamePage';
import { withMetadataGenerator, withPageData } from '@/app/_helpers';
import { _getPage } from './_getPage';

export const generateMetadata = withMetadataGenerator(_getPage);

export default withPageData(GamePage, _getPage);
