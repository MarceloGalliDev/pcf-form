import { ButtonHTMLAttributes } from 'react'


type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean
};

export function ButtonOutlined({isOutlined = false, ...props}: ButtonProps) {
  return (
    <button
      className={`button ${isOutlined ? 'outlined' : ''}`}
      {...props}
    />
  )
};