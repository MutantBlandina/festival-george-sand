import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "À propos", href: "#apropos" },
    { name: "La Résidence", href: "#residence" },
    { name: "Les Prix", href: "#prix" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b-2 border-transparent",
        isScrolled
          ? "bg-background border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn(
          "flex justify-between items-center transition-all duration-300",
          isScrolled ? "py-2" : "py-4"
        )}>
          <a href="#" className="flex-shrink-0 flex items-center group">
            <img 
              src={isScrolled ? "/logo-violet.png" : "/logo-jaune.png"}
              alt="Festival George Sand Logo" 
              className={cn(
                "w-auto transition-all duration-300 group-hover:scale-105",
                isScrolled ? "h-12" : "h-16"
              )}
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-display font-semibold uppercase tracking-wider transition-colors hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full",
                  isScrolled ? "text-foreground" : "text-white"
                )}
              >
                {link.name}
              </a>
            ))}
            <Button asChild variant="accent" className="font-bold">
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSdtRkqnlMNJ7Zmi0_1yRqs-nIIX9GbcU2YKUzyPg3rRPRLl1A/viewform" target="_blank" rel="noopener noreferrer">Candidater à la résidence</a>
            </Button>
          </nav>

          {/* Mobile/Tablet Menu Toggle */}
          <button
            className="lg:hidden text-foreground p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className={cn("h-8 w-8", !isScrolled && "text-white")} />
            ) : (
              <Menu className={cn("h-8 w-8", !isScrolled && "text-white")} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Nav */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-background border-b-2 border-border shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-4 flex flex-col">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-display font-semibold uppercase tracking-wider text-foreground hover:text-primary py-2"
              >
                {link.name}
              </a>
            ))}
            <Button asChild variant="primary" className="w-full mt-4">
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSdtRkqnlMNJ7Zmi0_1yRqs-nIIX9GbcU2YKUzyPg3rRPRLl1A/viewform" target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)}>Candidater à la résidence</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
