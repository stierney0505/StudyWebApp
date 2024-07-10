import './container.css';

const Container = ({children}) => {
    return (
        <div className="content-container">
            {children}
        </div>
    );
}

export default Container;