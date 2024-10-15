import {ClanAllSubPage} from "@/preparedPages/ClanPages";
import {withPageData,createMetadataGenerator} from "@/app/_helpers";
import {_getPage} from "./_getPage";

export const generateMetadata = createMetadataGenerator(_getPage);
export default withPageData(ClanAllSubPage, _getPage);