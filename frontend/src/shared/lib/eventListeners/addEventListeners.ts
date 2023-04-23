export const addEventListeners = (eventNames: Array<keyof WindowEventMap>, handler: EventListenerOrEventListenerObject) => {
    eventNames.forEach(eventName => {
        window.addEventListener(eventName, handler);
    });
};