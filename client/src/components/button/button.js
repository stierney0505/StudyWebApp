import './button.css';

const button = ({text}) => {
    return (
        <button className='button'>
            {text}
        </button>
    );
};

export default button;