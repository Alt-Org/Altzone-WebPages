import {ComponentType} from "react";

/**
 * Higher-order component to fetch page data based on language parameter and pass it to the wrapped component.
 *
 * @template PageProps - Props used by the wrapped component
 * @param PageComponent - The React component to wrap and provide data to
 * @param getPage - Function that fetches the page data given a language string
 *
 * @returns A component that fetches data and renders the wrapped component with both fetched data and original props
 *
 * @example
 *
 *  // Assume MyPageComponent is a React component and fetchPageData is a function that returns a promise
 *  // resolving to page data
 *
 *  const MyPageWithData = withPageData(MyPageComponent, fetchPageData);
 *
 *  // Usage in a React application
 *  <MyPageWithData params={{ lng: 'en' }} someOtherProp="value" />
 *
 */
export function withPageData<PageProps>(
    PageComponent: ComponentType<PageProps>,
    getPage: (lng: string) => Promise<{ page: PageProps }>
) {
    return async function PageWithHOC(props: DefaultAppRouterProps & PageProps) {
        const {params} = props;
        const data = await getPage(params.lng);

        return <PageComponent {...data.page} {...props} />;
    };
}