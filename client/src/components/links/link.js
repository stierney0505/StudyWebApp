import './link.css';
import React from 'react';

const Link = ({children, href, underline, ...props}) => {
    if (underline === true){
        return (
            <a className="container-link" href={href} {...props}>
                {children}
            </a>
        );
    } else {
        return (
            <a className="container-link-no-underline" href={href} {...props}>
                {children}
            </a>
        );
    }
}

export default Link;