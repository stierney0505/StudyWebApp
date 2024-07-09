import './text-field.css'

const TextField = ({fieldId, text, type, value, onChange, ...props}) => {
    return (
        <div className="input-group">
            <input 
                id={fieldId}
                type={type} 
                value={value}
                onChange={onChange}
                {...props}
                required/>
            <label htmlFor={fieldId} required>{text}</label>
        </div>
    );
};

export default TextField;