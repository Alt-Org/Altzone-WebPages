import {_getPage} from "./_getPage";
import {MembersPage} from "@/preparedPages/MembersPage";
import {withPageData} from "@/shared/lib/hocs/withPageData";
import {createMetadataGenerator} from "@/shared/lib/createMetadataGenerator";

export const generateMetadata = createMetadataGenerator(_getPage);
export default withPageData(MembersPage, _getPage);