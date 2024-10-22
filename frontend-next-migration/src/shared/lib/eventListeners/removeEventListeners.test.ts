import { removeEventListeners } from './removeEventListeners';

describe('removeEventListeners', () => {
    let testHandler: EventListenerOrEventListenerObject | jest.Mock<any, any, any>;
    let eventNames: any[];

    beforeEach(() => {
        testHandler = jest.fn();
        eventNames = ['load', 'keydown'];
        window.addEventListener = jest.fn();
        window.removeEventListener = jest.fn();
        eventNames.forEach((eventName) => {
            window.addEventListener(eventName, testHandler);
        });
    });

    it('should remove the event listeners from the window', () => {
        removeEventListeners(eventNames, testHandler);
        eventNames.forEach((eventName) => {
            expect(window.removeEventListener).toHaveBeenCalledWith(eventName, testHandler);
        });
    });

    it('should not remove event listeners for events not in eventNames array', () => {
        const eventName = 'click';
        window.addEventListener(eventName, testHandler);
        removeEventListeners(eventNames, testHandler);
        expect(window.removeEventListener).not.toHaveBeenCalledWith(eventName, testHandler);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });
});
