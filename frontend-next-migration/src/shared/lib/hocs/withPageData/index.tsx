import {ComponentType} from "react";

/**
 * Higher-Order Component (HOC) to fetch and provide page data based on language.
 *
 * @template PageProps - The type of props the page component expects.
 * @param {ComponentType<PageProps>} PageComponent - The component to wrap.
 * @param {(lng: string) => Promise<{ page: PageProps }>} getPage - The function to fetch page data based on language.
 * @returns {ComponentType<DefaultAppRouterProps>} - The wrapped component with fetched data.
 *
 * @example
 * // Define a page component
 * const MyPage: React.FC<{ content: string }> = ({ content }) => (
 *   <div>{content}</div>
 * );
 *
 * // Define a function to fetch page data
 * const fetchPage = async (lng: string) => {
 *   const response = await fetch(`/api/page?lang=${lng}`);
 *   const data = await response.json();
 *   return { page: data };
 * };
 *
 * // Wrap the page component with the HOC
 * const MyPageWithData = withPageData(MyPage, fetchPage);
 *
 * // Now MyPageWithData can be used within a routing context
 */
// export function withPageData<PageProps>(
//     PageComponent: ComponentType<PageProps>,
//     getPage: (lng: string) => Promise<{ page: PageProps }>
// ): ComponentType<DefaultAppRouterProps> {
//     return async function PageWithHOC(props: DefaultAppRouterProps) {
//         const {params} = props;
//         const data = await getPage(params.lng);
//
//         return <PageComponent {...data.page} {...props} />;
//     };
// }



export function withPageData<PageProps>(
    PageComponent: ComponentType<PageProps>,
    getPage: (lng: string, ...args: any) => Promise<{ page: PageProps }>
): ComponentType<DefaultAppRouterProps> {
    return async function PageWithHOC(props: DefaultAppRouterProps) {
        const { params, ...restProps } = props;
        // @ts-ignore
        const data = await getPage(params.lng, restProps);

        console.log('getPage args:', params.lng, restProps);

        return <PageComponent {...data.page} {...props} />;
    };
}


