import { withPageData } from './withPageData';
import { createMetadataGenerator, withMetadataGenerator } from './createMetadataGenerator';

describe('promised route parameters', () => {
    it.each([
        { routeParams: { lng: 'fi' }, expectedArgs: ['fi'] },
        { routeParams: { lng: 'en', id: '42' }, expectedArgs: ['en', '42'] },
        {
            routeParams: { lng: 'ru', category: 'furniture', slug: 'chairs' },
            expectedArgs: ['ru', 'furniture', 'chairs'],
        },
    ])(
        'loads page data using resolved parameters $routeParams',
        async ({ routeParams, expectedArgs }) => {
            const params = Promise.resolve(routeParams);
            const pageData = { title: 'Page title' };
            const getPage = jest.fn().mockResolvedValue({ page: pageData });
            const PageContent = ({ title }: typeof pageData) => <h1>{title}</h1>;
            const Page = withPageData(PageContent, getPage);

            const result = await Page({ params });

            expect(getPage).toHaveBeenCalledWith(...expectedArgs);
            expect(getPage).toHaveBeenCalledTimes(1);
            expect(result.type).toBe(PageContent);
            expect(result.props).toEqual({ ...pageData, params });
        },
    );

    it('generates metadata using the resolved language', async () => {
        const seo = { title: 'Page title', description: 'Page description' };
        const getPage = jest.fn().mockResolvedValue({ seo });
        const generateMetadata = createMetadataGenerator(getPage);

        const result = await generateMetadata({ params: Promise.resolve({ lng: 'fi' }) });

        expect(getPage).toHaveBeenCalledWith('fi');
        expect(getPage).toHaveBeenCalledTimes(1);
        expect(result).toEqual(seo);
    });

    it('generates metadata using the resolved language and dynamic segments', async () => {
        const seo = { title: 'News title', description: 'News description' };
        const getPage = jest.fn().mockResolvedValue({ seo });
        const generateMetadata = withMetadataGenerator(getPage);
        const params = Promise.resolve({ lng: 'en', id: '42' });

        const result = await generateMetadata({ params });

        expect(getPage).toHaveBeenCalledWith('en', '42');
        expect(getPage).toHaveBeenCalledTimes(1);
        expect(result).toEqual(seo);
    });
});
