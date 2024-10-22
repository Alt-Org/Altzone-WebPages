type PageFactoryParams<TPageData = any, TSeoData = DefaultSeo> = {
    buildSeo: () => TSeoData;
    buildPage: () => TPageData;
};

export function createPage<TPageData = any, TSeoData = DefaultSeo>({
    buildSeo,
    buildPage,
}: PageFactoryParams<TPageData, TSeoData>) {
    const seo: TSeoData = buildSeo();
    const page: TPageData = buildPage();

    return {
        page,
        seo,
    };
}
