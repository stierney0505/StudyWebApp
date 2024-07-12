import './text.css'

const STxt = ({children, ...props}) => {
    return (
        <p className="smallText" {...props}>{children}</p>
    );
}

const MTxt = ({children, ...props}) => {
    return (
        <p className="mediumText" {...props}>{children}</p>
    );
}

const LTxt = ({children, ...props}) => {
    return (
        <p className="largeText" {...props}>{children}</p>
    );
}

export {
    STxt,
    MTxt,
    LTxt,
}