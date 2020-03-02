import React, { forwardRef, ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  icon?: string;
} 

export default forwardRef<HTMLButtonElement, ButtonProps>(({
  text,
  icon,
  ...rest
}, ref) => {
  return (
    <button
      ref={ref}
      className='Button'
      {...rest}
    >
      {
        icon ?
          <i className='material-icons'>{icon}</i> :
          text
      }
    </button>
  )
})