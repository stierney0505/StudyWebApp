import './button.css';

const Button = ({ type, text }) => (
  <button className='button poppins-semibold' type={type}>
    {text}
  </button>
);

export default Button;