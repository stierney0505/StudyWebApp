import './textfield.css'

const TextField = ({text, type, value, onChange, ...props}) => {
    return (
        <div>
            <div className="input-group">
                <input 
                    type={type} 
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    {...props}
                    required/>
                <label htmlFor="" required>{text}</label>
            </div>
        </div>
    );
};

export default TextField;