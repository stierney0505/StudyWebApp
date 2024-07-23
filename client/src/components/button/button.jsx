import './button.css';

const InputButton = ({type = 'button', text, onClick, ...props}) => {
    return (
        <button className='button' type={type} onClick={onClick} {...props}>
            {text}
        </button>
    );
};

export default InputButton;