import {useState} from "react";
import './radio-button.css';

const RadioButton = ({options, ...props}) => {

    const [selectedValue, setSelectedValue] = useState(
        options.find(option => option.checked)?.value || ""
    );

    //sets selectedValue to value of option selected
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    return (
        <body {...props}>
            {options?.map((option, index) => (
                <label key={index} className="container">{option.value}
                    <input 
                        type="radio" 
                        name="option" 
                        value={option.value}
                        checked={selectedValue === option.value}
                        onChange={handleChange}
                    />
                    <span className="checkmark"></span>
                </label>
            ))}
        </body>
        
    );
}

export default RadioButton;