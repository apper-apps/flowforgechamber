import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ className, variant = "default", size = "default", children, ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
const variants = {
    default: "gradient-button text-white shadow-lg hover:shadow-xl focus:ring-neon-purple/50",
    outline: "border-2 border-neon-purple text-neon-purple hover:bg-neon-purple/10 focus:ring-neon-purple/50",
    ghost: "text-neon-purple hover:bg-neon-purple/10 focus:ring-neon-purple/50",
    secondary: "bg-dark-surface text-gray-300 hover:bg-dark-border focus:ring-gray-500 border border-dark-border",
    success: "bg-accent-500 text-white hover:bg-accent-600 shadow-lg hover:shadow-xl focus:ring-accent-500"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    default: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
    xl: "px-8 py-4 text-lg"
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;