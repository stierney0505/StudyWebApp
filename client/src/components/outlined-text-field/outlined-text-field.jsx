import styles from './outlined-text-field.module.css';

const OutlinedTextField = ({fieldId, name, text, type, value, onChange, register, isError, ...props}) => {
    return (
        <div
            className={!isError ? styles['input-group'] : [styles['input-group'], styles['error']].join(' ')}
            {...props}
        >
            <input 
                id={fieldId}
                name={name}
                type={type}
                placeholder=""
                value={value}
                onChange={onChange}
                {...register}
            />
            <label htmlFor={fieldId}>{text}</label>
        </div>
    );
};

export default OutlinedTextField;