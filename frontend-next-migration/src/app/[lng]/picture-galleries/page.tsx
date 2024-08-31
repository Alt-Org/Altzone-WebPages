import {PictureGalleryPage } from "@/preparedPages/PictureGalleryPages";
import {createMetadataGenerator} from "@/shared/lib/createMetadataGenerator";
import {withPageData} from "@/shared/lib/hocs/withPageData";
import {_getPage} from "./_getPage";

export const generateMetadata = createMetadataGenerator(_getPage);
export default withPageData(PictureGalleryPage, _getPage);
