import { useState, useEffect } from 'react';

const useIsTouchDevice = () =>{
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        // const supportsTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        // setIsTouchDevice(isMobileDevice || supportsTouch);
        setIsTouchDevice(isMobileDevice);
    }, []);

    return {isTouchDevice};
}

export default useIsTouchDevice;