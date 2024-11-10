/**
 * Removes event listeners from the window object.
 *
 * @param {Array<keyof WindowEventMap>} eventNames - An array of event names for which event listeners will be removed.
 * @param {EventListenerOrEventListenerObject} handler - The event listener function or object that will be removed.
 *
 * @example
 * const handler = (event: Event) => console.log(event.type);
 * addEventListeners(['click', 'keydown'], handler);
 * removeEventListeners(['click', 'keydown'], handler);
 */
export const removeEventListeners = (
    eventNames: Array<keyof WindowEventMap>,
    handler: EventListenerOrEventListenerObject,
) => {
    eventNames.forEach((eventName) => {
        window.removeEventListener(eventName, handler);
    });
};
