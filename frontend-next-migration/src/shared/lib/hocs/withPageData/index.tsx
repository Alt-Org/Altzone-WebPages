import {ComponentType} from "react";

export function withPageData<PageProps>(
    PageComponent: ComponentType<PageProps>,
    getPage: (lng: string) => Promise<{ page: PageProps }>
) {
    return async function PageWithHOC(props: DefaultAppRouterProps & PageProps) {
        const { params } = props;
        const data = await getPage(params.lng);

        return <PageComponent {...data.page} {...props} />;
    };
}