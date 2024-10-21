import { useState, useEffect } from 'react';

/**
 * Custom hook to detect if the device is a touch device.
 *
 * @returns {Object} An object containing a boolean `isTouchDevice` which
 * indicates if the current device is a touch device.
 *
 * @example
 * const { isTouchDevice } = useIsTouchDevice();
 * console.log(isTouchDevice); // true or false
 */
const useIsTouchDevice = () => {
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        const isMobileDevice =
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent,
            );
        // const supportsTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        // setIsTouchDevice(isMobileDevice || supportsTouch);
        setIsTouchDevice(isMobileDevice);
    }, []);

    return { isTouchDevice };
};

export default useIsTouchDevice;
