import {_getPage} from "./_getPage";
import { CookiesPage } from '@/preparedPages/CookiesPage';
import {createMetadataGenerator} from "@/shared/lib/createMetadataGenerator";
import {withPageData} from "@/shared/lib/hocs/withPageData";

export const generateMetadata = createMetadataGenerator(_getPage);
export default withPageData(CookiesPage, _getPage);