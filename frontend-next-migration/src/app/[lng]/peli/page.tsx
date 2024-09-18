import {GamePage} from "@/preparedPages/GamePage";
import {withPageData ,
    // createMetadataGenerator
} from "@/app/_helpers";
import {_getPage} from "./_getPage";

// todo add after it will be ready
// export const generateMetadata = createMetadataGenerator(_getPage);
export default withPageData(GamePage, _getPage);


