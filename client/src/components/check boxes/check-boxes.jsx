import { useState } from "react";
import './check-boxes.css';

const CheckBoxes = ({options, ...props}) => {

    const [selectedValues, setSelectedValues] = useState([]);

    useState(() => {
        const initialSelectedValues = options.filter(option => option.checked).map(option => option.value);
        setSelectedValues(initialSelectedValues);
    });

    const addItem = (item) => {
        setSelectedValues([...selectedValues, item])
    }

    const removeItem = (item) => {
        setSelectedValues(selectedValues.filter(value => value !== item));
    }

    const handleChange = (event) => {
        event.target.checked === true ? addItem(event.target.value) : removeItem(event.target.value);
    }

    return (
        <body {...props} >
            {options?.map((option, index) => (
                <label key={index} className="container-chbx">{option.value}
                    <input 
                        type="checkbox"
                        value={option.value}
                        onChange={handleChange}
                        checked={selectedValues.includes(option.value)}
                    />
                    <span className="checkmark-chbx"></span>
                </label>
            ))}
            
        </body>
    );
}

export default CheckBoxes;