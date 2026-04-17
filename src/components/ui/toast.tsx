import * as React from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

// Simplified toast for frontend only demo
export function Toast({ 
  title, 
  description, 
  onClose,
  variant = "default"
}: { 
  title: string; 
  description?: string; 
  onClose: () => void;
  variant?: "default" | "destructive" | "success"
}) {
  const variantStyles = {
    default: "bg-background border-border text-foreground",
    destructive: "bg-destructive border-destructive text-destructive-foreground",
    success: "bg-primary border-primary text-primary-foreground"
  }

  return (
    <div className={cn(
      "pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden border-2 p-6 pr-8 shadow-xl transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
      variantStyles[variant]
    )}>
      <div className="grid gap-1">
        {title && <div className="text-sm font-display font-bold uppercase">{title}</div>}
        {description && <div className="text-sm opacity-90">{description}</div>}
      </div>
      <button
        onClick={onClose}
        className="absolute right-2 top-2 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
