import {ProfilePage} from "@/preparedPages/ProfilePage";
import {withPageData ,
    // createMetadataGenerator
} from "@/app/_helpers";
import {_getPage} from "./_getPage";
// todo to enable it once it is added to i18n locales.
// export const generateMetadata = createMetadataGenerator(_getPage);
export default withPageData(ProfilePage, _getPage);