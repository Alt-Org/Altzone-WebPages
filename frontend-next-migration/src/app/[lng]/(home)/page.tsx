import {MainPage} from "@/preparedPages/MainPage";
import {_getPage} from "./_getPage";
import {createMetadataGenerator} from "@/shared/lib/createMetadataGenerator";
import {withPageData} from "@/shared/lib/hocs/withPageData";

export const generateMetadata = createMetadataGenerator(_getPage);
export default withPageData(MainPage, _getPage);
