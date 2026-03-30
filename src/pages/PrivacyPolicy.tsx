import { ArrowLeft } from "lucide-react"
import { Link } from "wouter"
import { Button } from "@/components/ui/button"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="mb-10">
          <Button variant="ghost" asChild className="mb-6 -ml-2">
            <Link href="/">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Retour au site
            </Link>
          </Button>
          <div className="h-[3px] w-12 bg-primary mb-6" />
          <h1 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight text-foreground mb-4">
            Protection des données
          </h1>
          <p className="text-muted-foreground font-serif text-lg">à caractère personnel</p>
        </div>

        <div className="prose prose-lg max-w-none font-serif text-foreground space-y-6">
          <p>
            L'Association <strong>Culture en Vallée Noire</strong> s'engage à respecter les dispositions :
          </p>
          <ul className="list-disc pl-6 space-y-2 text-base">
            <li>du Règlement Européen (UE) n° 2016/679 du 27 avril 2016 relatif à la protection des personnes physiques à l'égard du traitement des données à caractère personnel,</li>
            <li>de la loi n° 2018-493 du 20 juin 2018 relative à la protection des données personnelles,</li>
            <li>de la loi n° 78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers et aux libertés modifiée,</li>
            <li>et plus globalement l'ensemble de la règlementation liée aux traitements de données à caractère personnel.</li>
          </ul>

          <p>
            Les ayants droit restent responsables de tous les traitements de données à caractère personnel réalisés au sein de leurs entités et s'engagent à prendre toutes les mesures administratives et légales nécessaires.
          </p>

          <p>
            Culture en Vallée Noire traite des données à caractère personnel en tant que responsable de traitement à des fins de gestion de ses relations avec les ayants droit. La base juridique de ce traitement est le règlement présent.
          </p>

          <p>
            Culture en Vallée Noire prend toutes les mesures organisationnelles et techniques afin de sécuriser les données à caractère personnel confiées par les ayants droit.
          </p>

          <p>
            Les ayants droit peuvent exercer leurs droits de rétractation en envoyant un courrier à{" "}
            <a href="mailto:cultureenvalleenoire@gmail.com" className="text-primary underline hover:opacity-80">
              cultureenvalleenoire@gmail.com
            </a>.
          </p>

          <div className="border-t border-border pt-6 mt-8">
            <h2 className="text-xl font-display font-bold uppercase tracking-wider mb-4 text-foreground">À noter</h2>
            <ul className="space-y-3 text-base">
              <li>Le présent règlement est rédigé en français. En cas de contestation sur l'interprétation du texte, la version française fera foi.</li>
              <li>La direction du Festival se réserve le droit de prendre toute décision relative à des questions non prévues par le présent règlement.</li>
              <li>Les demandes d'admission à la compétition du Festival George Sand impliquent l'acceptation inconditionnelle du présent règlement.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
