import './text-area.css'

const TextArea = ({text, type, value, onChange, ...props}) => {
    return (
        <div className="textarea-group">
            <textarea 
                type={type} 
                value={value}
                onChange={(e) => onChange(e.target.value)}
                {...props}
                required
            />
            <label htmlFor="" required>{text}</label>
        </div>
    );
};

export default TextArea;