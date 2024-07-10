import './text.css'

const STxt = ({children}) => {
    return (
        <p className="smallText">{children}</p>
    );
}

const MTxt = ({children}) => {
    return (
        <p className="mediumText">{children}</p>
    );
}

const LTxt = ({children}) => {
    return (
        <p className="largeText">{children}</p>
    );
}

export {
    STxt,
    MTxt,
    LTxt,
}