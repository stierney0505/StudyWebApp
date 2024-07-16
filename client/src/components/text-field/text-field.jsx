import './text-field.css'

const TextField = ({fieldId, text, placeholder, name, register, type, value, onChange, ...props}) => {
    return (
        <div className="input-group" {...props}>
            <input 
                id={fieldId}
                type={type} 
                value={value}
                name={name}
                onChange={onChange}
                placeholder={placeholder}
                {...register}
            required/>
            <label htmlFor={fieldId}>{text}</label>
        </div>
    );
};

export default TextField;