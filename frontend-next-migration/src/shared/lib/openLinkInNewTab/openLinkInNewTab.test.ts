import {openLinkInNewTab} from './openLinkInNewTab';

import {jest} from '@jest/globals';
// Mocking the window.open function
global.window = Object.create(window);
const url = "http://dummy.com";
Object.defineProperty(window, 'open', {writable: true, configurable: true, value: jest.fn()});

/*
* Test suite for openLinkInNewTab function.
*/
describe("openLinkInNewTab", () => {
    // Single use case: When a link is passed, function opens it in a new tab
    it("should open a new tab with the URL passed", () => {
        openLinkInNewTab(url);
        expect(window.open).toBeCalledWith(url, '_blank');
    });

    // Single use case: Handle when no link is passed
    it("should open a new blank tab when no URL passed", () => {
        openLinkInNewTab();
        expect(window.open).toBeCalledWith('about:blank', '_blank');
    });
});
