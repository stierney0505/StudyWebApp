import './text-field.css';

const TextField = ({ fieldId, label, name, inputType, placeholder, value, onChange }) => (
  <div className='text-field-group'>
    {label && <label htmlFor={fieldId} className='text-field-label poppins-semibold'>{label}</label>}
    <input
      id={fieldId}
      name={name}
      type={inputType}
      className='text-field poppins-medium'
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

export default TextField;