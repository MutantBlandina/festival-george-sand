import { useState, useCallback } from "react"

type ToastVariant = "default" | "destructive" | "success"

export interface ToastData {
  id: string
  title: string
  description?: string
  variant?: ToastVariant
}

let toastListener: ((toast: ToastData) => void) | null = null

export function toast(props: Omit<ToastData, "id">) {
  if (toastListener) {
    toastListener({ ...props, id: Math.random().toString(36).substr(2, 9) })
  }
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastData[]>([])

  React.useEffect(() => {
    toastListener = (toast) => {
      setToasts((prev) => [...prev, toast])
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id))
      }, 5000)
    }
    return () => {
      toastListener = null
    }
  }, [])

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return { toasts, dismiss, toast }
}

import React from "react"
