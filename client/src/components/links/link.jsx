import './link.css';
import { useNavigate } from 'react-router-dom';

const Link = ({children, href, underline, ...props}) => {
    
    const navigate = useNavigate();

    const navigateRoute = (route) => {
        if (route)
            navigate(route);
    }

    if (underline === true){
        return (
            <a className="container-link" onClick={() => navigateRoute(href)} {...props}>
                {children}
            </a>
        );
    } else {
        return (
            <a className="container-link-no-underline" onClick={() => navigateRoute(href)} {...props}>
                {children}
            </a>
        );
    }
}

export default Link;