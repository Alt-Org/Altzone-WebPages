import {_getPage} from "./_getPage";
import {MembersPage} from "@/preparedPages/MembersPage";
import {withPageData,createMetadataGenerator} from "src/app/_helpers";

export const generateMetadata = createMetadataGenerator(_getPage);
export default withPageData(MembersPage, _getPage);