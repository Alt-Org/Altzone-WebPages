import {openLinkInNewTab} from './openLinkInNewTab';

// Mocking the window.open function
global.window = Object.create(window);
const url = "http://dummy.com";
Object.defineProperty(window, 'open', {writable: true, configurable: true, value: jest.fn()});

// Function description
describe("openLinkInNewTab", () => {
    // Single use case: When a link is passed, function opens it in a new tab
    it("opens a new tab with the URL passed", () => {
        openLinkInNewTab(url);
        expect(window.open).toBeCalledWith(url, '_blank');
    });

    // Single use case: Handle when no link is passed
    it("opens a new blank tab when no URL passed", () => {
        openLinkInNewTab();
        expect(window.open).toBeCalledWith(undefined, '_blank');
    });
});