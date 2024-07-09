import './container.css';
import React from "react";

const Container = ({children}) => {
    return (
        <div className="content-container">
            {children}
        </div>
    );
}

export default Container;