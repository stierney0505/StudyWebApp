import styles from './button.module.css';

const InputButton = ({
  type = 'button',
  text,
  size = 'medium',
  onClick,
  ...props
}) => {
  return (
    <button
      className={`${styles['button']} ${styles[size]}`}
      type={type}
      onClick={onClick}
      {...props}
    >
      {text}
    </button>
  );
};

export default InputButton;
