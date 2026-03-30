import { Link } from "wouter"

export function Footer() {
  return (
    <footer className="bg-black text-white py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start text-center md:text-left">
          
          <div className="flex justify-center md:justify-start">
            <img 
              src="/logo-jaune.png"
              alt="Festival George Sand" 
              className="h-20 opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>
          
          <div className="flex flex-col space-y-4">
            <a href="#apropos" className="font-display font-semibold hover:text-primary-foreground transition-colors uppercase tracking-wider text-sm">À propos</a>
            <a href="#proposer" className="font-display font-semibold hover:text-primary-foreground transition-colors uppercase tracking-wider text-sm">Proposer un film</a>
            <a href="#residence" className="font-display font-semibold hover:text-primary-foreground transition-colors uppercase tracking-wider text-sm">La Résidence</a>
            <a href="#contact" className="font-display font-semibold hover:text-primary-foreground transition-colors uppercase tracking-wider text-sm">Contact</a>
            <Link href="/protection-des-donnees" className="font-display font-semibold hover:text-primary-foreground transition-colors uppercase tracking-wider text-sm text-gray-500 hover:text-gray-300">
              Protection des données
            </Link>
          </div>

          <div className="flex flex-col space-y-6 md:items-end">
            <div className="flex flex-wrap justify-center md:justify-end items-center gap-6">
              <img 
                src="/logo-lachatre.png"
                alt="La Châtre"
                className="h-8 object-contain opacity-50 hover:opacity-80 transition-opacity"
              />
              <img 
                src="/logo-annee-gs.png"
                alt="Année George Sand 2026"
                className="h-10 object-contain opacity-50 hover:opacity-80 transition-opacity"
              />
              <img 
                src="https://festivalgeorgesand.com/wp-content/uploads/2026/01/cvn_logo-06.png" 
                alt="Culture en Vallée Noire" 
                className="h-10 object-contain invert brightness-0 opacity-50 hover:opacity-80 transition-opacity"
              />
            </div>
            <p className="text-sm text-gray-500 font-sans">
              © 2026 Festival George Sand du Court-métrage.
            </p>
          </div>

        </div>
      </div>
    </footer>
  )
}
