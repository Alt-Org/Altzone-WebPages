import {DataPolicyPage} from "@/preparedPages/DataPolicyPage";
import {withPageData} from "@/shared/lib/hocs/withPageData";
import {_getPage} from "./_getPage"

// todo add after adding i18n
// export const generateMetadata = createMetadataGenerator(_getPage);
export default withPageData(DataPolicyPage, _getPage);