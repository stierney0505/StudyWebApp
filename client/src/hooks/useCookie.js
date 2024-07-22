/* useCookie Hook used and modified from https://www.sitepoint.com/react-cookies-sessions/
 - Max */

import { useState, useEffect } from 'react';

const useCookie = (cookieName) => {
    
    const [cookieValue, setCookieValue] = useState("");

    useEffect(() => {
        let cookie = document.cookie;
        cookie = cookie.split("; ");
        cookie = cookie.find((row) => row.startsWith(`${cookieName}=`));

        setCookieValue(cookie ? cookie.split("=")[1] : "");

    }, [cookieName]);

    const setCookie = (value) => {
        document.cookie = `${cookieName}=${value}; path=/`
    };


    return [cookieValue, setCookie];
}

export default useCookie;