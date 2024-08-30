import { GameArtPage } from '@/preparedPages/GameArtPage';
import {createMetadataGenerator} from "@/shared/lib/createMetadataGenerator";
import {_getPage} from "./_getPage";
import {withPageData} from "@/shared/lib/hocs/withPageData";


export const generateMetadata = createMetadataGenerator(_getPage);
export default withPageData(GameArtPage, _getPage);

