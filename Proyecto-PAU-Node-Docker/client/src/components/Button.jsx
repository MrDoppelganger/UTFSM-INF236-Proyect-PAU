import React from 'react';

export default function Button({ 
  children, 
  variant = 'primary', 
  onClick, 
  className = '', 
  type = 'button',
  fullWidth = false,
  ...props 
}) {
  const baseStyles = "inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900 shadow-sm hover:shadow-md active:scale-95";
  
  const variants = {
    primary: "bg-brand-primary hover:bg-usm-blue-dark text-white focus:ring-brand-primary",
    secondary: "bg-brand-secondary hover:bg-usm-gold-light text-slate-900 focus:ring-brand-secondary",
    danger: "bg-brand-danger hover:bg-red-800 text-white focus:ring-brand-danger",
    outline: "border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white focus:ring-brand-primary dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-slate-900",
    ghost: "bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-none hover:shadow-none focus:ring-slate-400"
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
