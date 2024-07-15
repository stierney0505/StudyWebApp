import './text-field.css'

const TextField = ({fieldId, text, placeholder, type, value, onChange, ...props}) => {
    return (
        <div className="input-group" {...props}>
            <input 
                id={fieldId}
                type={type} 
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required/>
            <label htmlFor={fieldId} required>{text}</label>
        </div>
    );
};

export default TextField;