import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: "default" | "primary" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "accent"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    // Manual variant matching since we don't have CVA installed
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap text-sm font-display font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 uppercase tracking-wider"
    
    const variants = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:-translate-y-0.5 shadow-md hover:shadow-lg",
      primary: "bg-primary text-primary-foreground hover:bg-primary/90 hover:-translate-y-0.5 shadow-md hover:shadow-lg",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline: "border-2 border-primary bg-transparent hover:bg-primary text-primary hover:text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
      accent: "bg-accent text-accent-foreground hover:bg-accent/90 hover:-translate-y-0.5 shadow-md hover:shadow-lg"
    }

    const sizes = {
      default: "h-12 px-6 py-2",
      sm: "h-9 px-3",
      lg: "h-14 px-10 text-base",
      icon: "h-10 w-10",
    }

    return (
      <Comp
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
