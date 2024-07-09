import './dropdown.css'

const DropDown = ({text, options, hint, ...props}) => {
    return (
        <div className="select-group">
            <select name="" id="" {...props}>
                <option value="na" disabled>{hint}</option>
                {options?.map((option, index) => (
                    <option key={index} value={option.value}>{option.text}</option>
                ))}
            </select>

            <label htmlFor="" required>{text}</label>
        </div>
       
    );
}

export default DropDown;