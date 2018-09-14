import React from 'react';
import './Button.css';

const Button = ({ onClick, className, children, ...rest }) =>
    <button
        onClick={() => onClick(...rest)}
        className={className + ' btn'}
    >
        {children}
    </button>

export default Button;