export const removeEventListeners = (eventNames: Array<keyof WindowEventMap>, handler: EventListenerOrEventListenerObject) => {
    eventNames.forEach(eventName => {
        window.removeEventListener(eventName, handler);
    });
};