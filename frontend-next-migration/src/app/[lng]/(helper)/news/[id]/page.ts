// import { withMetadataGenerator } from "@/app/_helpers";
import { withPageData, withMetadataGenerator } from '@/app/_helpers';
import { _getPage } from './_getPage';
import { NewsElementPage } from '@/preparedPages/NewsPages';

export const generateMetadata = withMetadataGenerator(_getPage);
export default withPageData(NewsElementPage, _getPage);
