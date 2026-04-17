import { useToast } from "@/hooks/use-toast"
import { Toast } from "./toast"

export function Toaster() {
  const { toasts, dismiss } = useToast()

  return (
    <div className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px] gap-2">
      {toasts.map((t) => (
        <Toast 
          key={t.id} 
          title={t.title} 
          description={t.description} 
          variant={t.variant}
          onClose={() => dismiss(t.id)} 
        />
      ))}
    </div>
  )
}
