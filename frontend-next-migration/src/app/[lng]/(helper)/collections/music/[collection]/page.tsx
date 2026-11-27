import { redirect } from 'next/navigation';
import { getRouteAllMusicCollectionsPage } from '@/shared/appLinks/RoutePaths';

export default async function Page(props: {
    params: Promise<{ lng: string; collection: string }>;
}) {
    const params = await props.params;
    redirect(`/${params.lng}${getRouteAllMusicCollectionsPage()}`);
}
