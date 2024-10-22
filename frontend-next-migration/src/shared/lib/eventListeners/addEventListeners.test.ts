import { addEventListeners } from './addEventListeners';

describe('addEventListeners', () => {
    beforeEach(() => {
        window.removeEventListener = jest.fn();
        window.addEventListener = jest.fn();
    });

    it('should attach event listeners to the window object', () => {
        const events = ['resize', 'scroll'] as Array<keyof WindowEventMap>;
        const handler = jest.fn();

        addEventListeners(events, handler);

        events.forEach((event) => {
            expect(window.addEventListener).toHaveBeenCalledWith(event, handler);
        });
    });

    it('should handle multiple event names', () => {
        const events = ['click', 'keydown'] as Array<keyof WindowEventMap>;
        const handler = jest.fn();

        addEventListeners(events, handler);

        expect(window.addEventListener).toHaveBeenCalledTimes(events.length);
    });

    it('should not call addEventListener if no events are provided', () => {
        const handler = jest.fn();
        const events: Array<keyof WindowEventMap> = [];

        addEventListeners(events, handler);

        expect(window.addEventListener).not.toHaveBeenCalled();
    });
});
