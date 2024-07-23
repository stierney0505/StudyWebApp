import './button.css';
import { useNavigate } from 'react-router-dom';

const InputButton = ({text, URL, ...props}) => {

    const navigate = useNavigate();

    const navigateRoute = (route) => {
        if (route)
            navigate(route)
    }


    return (
        <button
            className='button'
            onClick={() => navigateRoute(URL)}
            {...props}
        >
            {text}
        </button>
    );
};

export default InputButton;