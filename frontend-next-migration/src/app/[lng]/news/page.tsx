import {NewsPage} from "@/preparedPages/NewsPages";
import {withPageData,createMetadataGenerator} from "src/app/_helpers";
import {_getPage} from "./_getPage";

export const generateMetadata = createMetadataGenerator(_getPage);
export default withPageData(NewsPage, _getPage);
