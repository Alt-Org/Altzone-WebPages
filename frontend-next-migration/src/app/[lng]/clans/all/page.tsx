import {ClanAllSubPage} from "@/preparedPages/ClanPages";
import {createMetadataGenerator} from "@/shared/lib/createMetadataGenerator";
import {withPageData} from "@/shared/lib/hocs/withPageData";
import {_getPage} from "./_getPage";

export const generateMetadata = createMetadataGenerator(_getPage);
export default withPageData(ClanAllSubPage, _getPage);
