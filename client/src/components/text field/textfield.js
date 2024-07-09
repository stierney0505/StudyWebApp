import './textfield.css'

const TextField = ({text, type, value, onChange, ...props}) => {
    return (
        <div className="input-group">
            <input 
                type={type} 
                value={value}
                onChange={(e) => onChange(e.target.value)}
                {...props}
                required/>
            <label htmlFor="" required>{text}</label>
        </div>
    );
};

export default TextField;