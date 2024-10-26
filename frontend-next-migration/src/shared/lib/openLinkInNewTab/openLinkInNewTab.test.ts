import { openLinkInNewTab } from './openLinkInNewTab';

describe('openLinkInNewTab', () => {
    beforeEach(() => {
        window.open = jest.fn();
    });

    it('should open the provided valid URL in a new tab', () => {
        const validUrl = 'https://example.com';
        openLinkInNewTab(validUrl);
        expect(window.open).toHaveBeenCalledWith(validUrl, '_blank');
    });

    it('should open a blank tab if the URL is invalid', () => {
        const invalidUrl = 'invalid-url';
        openLinkInNewTab(invalidUrl);
        expect(window.open).toHaveBeenCalledWith('about:blank', '_blank');
    });

    it('should open a blank tab if no URL is provided', () => {
        openLinkInNewTab();
        expect(window.open).toHaveBeenCalledWith('about:blank', '_blank');
    });

    it('should open a valid URL with special characters', () => {
        const specialCharUrl = 'https://example.com/?query=testing&value=123';
        openLinkInNewTab(specialCharUrl);
        expect(window.open).toHaveBeenCalledWith(specialCharUrl, '_blank');
    });
});
