import { InputHTMLAttributes } from 'react';
import Numeral from 'numeral';


type ButtonProps = InputHTMLAttributes<HTMLButtonElement> & {
  format?: string,
  children?: string,
}

export function InputText({ format, children, ...props }: ButtonProps) {
  return (
    <span>
      {Numeral(children).format(format)}
    </span>
    
  )
}