import {MainPage} from "@/preparedPages/MainPage";
import {_getPage} from "./_getPage";
import {withPageData,createMetadataGenerator} from "@/app/_helpers";

export const generateMetadata = createMetadataGenerator(_getPage);
export default withPageData(MainPage, _getPage);