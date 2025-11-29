import { redirect } from 'next/navigation';
import { getRouteAllMusicCollectionsPage } from '@/shared/appLinks/RoutePaths';

export default function Page({ params }: { params: { lng: string; collection: string } }) {
    redirect(`/${params.lng}${getRouteAllMusicCollectionsPage()}`);
}
