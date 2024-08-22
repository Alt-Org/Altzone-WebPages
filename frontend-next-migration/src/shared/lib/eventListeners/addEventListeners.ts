/**
 * Attaches event listeners to the window object.
 *
 * @param {Array<keyof WindowEventMap>} eventNames - The names of the events to listen for.
 * @param {EventListenerOrEventListenerObject} handler - The event handler function or object.
 * @return {void}
 */
export const addEventListeners = (eventNames: Array<keyof WindowEventMap>, handler: EventListenerOrEventListenerObject) => {
    eventNames.forEach(eventName => {
        window.addEventListener(eventName, handler);
    });
};