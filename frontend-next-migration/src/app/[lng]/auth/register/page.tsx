import {AuthSubRegisterPage} from "@/preparedPages/AuthPages";
import {withPageData,createMetadataGenerator} from "@/app/_helpers";
import {_getPage} from "./_getPage";

export const generateMetadata = createMetadataGenerator(_getPage);
export default withPageData(AuthSubRegisterPage, _getPage);
