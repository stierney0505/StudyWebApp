import styles from './header-search-bar.module.css';

const HeaderSearchBar = ({
  name,
  placeholder,
  title,
  growOnFocus = true,
  value,
  onChange,
  ...props
}) => {
  return (
    <search
      className={
        growOnFocus
          ? `${styles['input-group']}`
          : `${styles['input-group']} ${styles['grow-on-focus']}`
        }
      {...props}
    >
      <input
        name={name}
        type="search"
        placeholder={placeholder}
        title={title}
        value={value}
        onChange={onChange}
      />
    </search>
  );
};

export default HeaderSearchBar;
