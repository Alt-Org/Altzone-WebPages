import {GamePage} from "@/preparedPages/GamePage";
import {createMetadataGenerator} from "@/shared/lib/createMetadataGenerator";
import {withPageData} from "@/shared/lib/hocs/withPageData";
import {_getPage} from "./_getPage";

// todo add after it will be ready
// export const generateMetadata = createMetadataGenerator(_getPage);
export default withPageData(GamePage, _getPage);


