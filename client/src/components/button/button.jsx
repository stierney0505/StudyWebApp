import './button.css';

const InputButton = ({text, children, ...props}) => {

    return (
        <button className='button' {...props}>
            {text}
            {children}
        </button>
    );
};

export default InputButton;