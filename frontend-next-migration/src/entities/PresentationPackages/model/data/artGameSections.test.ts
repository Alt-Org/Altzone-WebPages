import { ArtGameSections } from './artGameSections';

describe('ArtGameSections', () => {
    it('should create seven sections with sequential ids', () => {
        expect(ArtGameSections.map((section) => section.id)).toEqual([
            'section1',
            'section2',
            'section3',
            'section4',
            'section5',
            'section6',
            'section7',
        ]);
    });

    it('should add an image to every section except content and literature', () => {
        const sectionsWithImage = ArtGameSections.filter((section) => section.image).map(
            (section) => section.label,
        );

        expect(sectionsWithImage).toEqual([
            'info-label',
            'intro-label',
            'implementation-label',
            'message-label',
            'joinus-label',
        ]);
    });

    it('should build i18n keys and the logo for each section', () => {
        expect(ArtGameSections[0]).toEqual({
            id: 'section1',
            navMenuTitle: 'info-nav-menu-title',
            label: 'info-label',
            description: 'info-description',
            image: expect.any(String),
            imageAlt: 'info-image',
            sidebarLogo: expect.any(String),
            sidebarLogoAlt: 'info-logo',
        });
    });
});
