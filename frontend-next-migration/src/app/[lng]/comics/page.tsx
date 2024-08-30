import {ComicsGalleriesPage} from "@/preparedPages/ComicsGalleriesPages";
import {_getPage} from "./_getPage";
import {createMetadataGenerator} from "@/shared/lib/createMetadataGenerator";
import {withPageData} from "@/shared/lib/hocs/withPageData";

// type Props = {
//     params: { lng: string }
// }
//
// export async function generateMetadata({ params }: Props): Promise<Metadata>  {
//     return await _getPage(params.lng).then(r => r.seo);
// }
//
// export default async function Comics({ params }: Props) {
//     const {page} = await  _getPage(params.lng);
//
//     return (
//         <>
//             <ComicsGalleriesPage
//                 {...page}
//             />
//         </>
//     )
// }

export const generateMetadata = createMetadataGenerator(_getPage);
export default withPageData(ComicsGalleriesPage, _getPage);
