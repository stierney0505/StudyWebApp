import './button.css';

const InputButton = ({text, ...props}) => {
    return (
        <button className='button' {...props}>
            {text}
        </button>
    );
};

export default InputButton;