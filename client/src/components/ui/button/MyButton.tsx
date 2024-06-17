import React from 'react';
import classes from './MyButton.module.scss';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean,
}

const Button: React.FC<ButtonProps> = React.memo(({ children, onClick,disabled }) => {
  return (
      <button className={`${classes.mybutton} ${disabled ? classes.disabled : ''}`} onClick={onClick}
              disabled={disabled}>
        {children}
      </button>
  );
});

export default Button;
