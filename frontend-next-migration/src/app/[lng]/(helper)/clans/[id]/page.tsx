import { ClanRoomSubPage as PreparedPage } from '@/preparedPages/ClanPages';
import { withMetadataGenerator } from '@/app/_helpers';
import { _getPage } from './_getPage';

type Props = {
    params: { lng: string; id: string };
};

export const generateMetadata = withMetadataGenerator(_getPage);

export default async function ClanRoomSubPage({ params }: Props) {
    const pageInfo = await _getPage(params.lng, params.id);

    return <PreparedPage translations={pageInfo.page.translations} />;
}
