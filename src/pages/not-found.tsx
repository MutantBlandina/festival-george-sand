import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground">
      <div className="text-center space-y-6 max-w-md p-8 border-2 border-border bg-card shadow-2xl">
        <h1 className="text-6xl font-display font-bold text-primary">404</h1>
        <h2 className="text-2xl font-display font-semibold uppercase">Page introuvable</h2>
        <p className="text-muted-foreground font-sans">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Button variant="primary" asChild className="w-full">
          <a href="/">Retour à l'accueil</a>
        </Button>
      </div>
    </div>
  )
}
