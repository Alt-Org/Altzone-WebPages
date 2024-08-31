import {ProfilePage} from "@/preparedPages/ProfilePage";
// import {createMetadataGenerator} from "@/shared/lib/createMetadataGenerator";
import {_getPage} from "./_getPage";
import {withPageData} from "@/shared/lib/hocs/withPageData";

// todo to enable it once it is added to i18n locales.
// export const generateMetadata = createMetadataGenerator(_getPage);
export default withPageData(ProfilePage, _getPage);