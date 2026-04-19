import { motion, useScroll, useTransform, useInView, animate } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Trophy, MapPin, Mail, Play, ArrowRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Animated counter ─────────────────────────────────────────────────────────
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return controls.stop;
  }, [isInView, value]);

  return <span ref={ref}>{display}{suffix}</span>;
}

// ─── Marquee strip ────────────────────────────────────────────────────────────
function MarqueeStrip({ dark = false }: { dark?: boolean }) {
  const words = ["Festival", "George Sand", "Court Métrage", "Berry", "2026", "Cinéma", "Émancipation", "Création"];
  return (
    <div className={cn("overflow-hidden py-3 border-y-2 border-border select-none", dark ? "bg-black border-white/10" : "bg-primary")}>
      <div className="marquee-track flex items-center">
        {[...Array(4)].map((_, rep) => (
          <div key={rep} className="flex items-center shrink-0">
            {words.map((word, i) => (
              <span key={i} className={cn(
                "flex items-center font-display font-bold uppercase tracking-[0.25em] text-sm px-6 whitespace-nowrap",
                dark ? "text-white/30" : "text-primary-foreground"
              )}>
                {word}
                <span className={cn("ml-6", dark ? "text-white/10" : "text-accent/70")}>◆</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Flip card (Prix) ─────────────────────────────────────────────────────────
function FlipCard({ name, description, index }: { name: string; description: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="group h-44 cursor-pointer"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        whileHover={{ rotateY: 180 }}
        transition={{ duration: 0.55, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 bg-card border-2 border-border flex flex-col items-center justify-center p-6 text-center" style={{ backfaceVisibility: "hidden" }}>
          <Trophy className="w-5 h-5 text-primary/30 mb-3" />
          <h4 className="font-display font-bold uppercase text-card-foreground text-sm leading-tight">{name}</h4>
        </div>
        <div className="absolute inset-0 bg-primary flex items-center justify-center p-6 text-center" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
          <p className="font-serif text-primary-foreground text-sm leading-snug">{description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function Home() {
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    try {
      const res = await fetch("https://formsubmit.co/ajax/bchevestrier@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, _subject: "Nouvel abonné Festival George Sand", message: `Nouvelle inscription à l'alerte : ${email}` }),
      });
      if (res.ok) {
        toast({ title: "Inscription réussie", description: "Votre inscription a bien été prise en compte.", variant: "success" });
        form.reset();
      } else throw new Error();
    } catch {
      toast({ title: "Erreur", description: "Une erreur est survenue. Veuillez réessayer.", variant: "destructive" });
    }
  };

  // Scroll progress bar
  const { scrollYProgress: pageProgress } = useScroll();

  // Hero parallax
  const heroRef = useRef<HTMLElement>(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImageY = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "0%"] : ["0%", "25%"]);
  const heroImageScale = useTransform(scrollYProgress, [0, 1], isMobile ? [1, 1] : [1, 1.15]);
  const heroContentY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, 120]);
  const heroContentOpacity = useTransform(scrollYProgress, [0, 0.5], isMobile ? [1, 1] : [1, 0]);

  const titleWords = ["Festival", "George Sand"];
  const subtitleChars = "du court métrage".split("");

  const prizes = [
    { name: "Prix du jury",               description: "Récompense le film le plus engagé et maîtrisé selon le jury officiel." },
    { name: "Prix du public",             description: "Voté par les spectateurs présents à la cérémonie du festival." },
    { name: "Prix du meilleur film amateur", description: "Pour valoriser la création en dehors des circuits professionnels." },
    { name: "Prix du scénario",           description: "Salue l'excellence de l'écriture et de la narration cinématographique." },
    { name: "Prix de l'interprétation",  description: "Pour la performance la plus convaincante à l'écran." },
    { name: "Prix de la photographie",   description: "Reconnaît la direction photo et la maîtrise de l'image." },
    { name: "Prix de la création sonore",description: "Distingue la qualité du son, des ambiances et de la musique." },
    { name: "Prix du montage",            description: "Pour le rythme, la fluidité et la cohérence du montage." },
  ];

  const calendarItems = [
    { num: "01", date: "15 Fév. 2026",     text: "Ouverture des candidatures pour la résidence de production audiovisuelle" },
    { num: "02", date: "26 Avr. 2026",     text: "Fin de la période de candidature pour la résidence" },
    { num: "03", date: "8–10 Mai 2026",    text: "Résidence de production audiovisuelle à La Châtre", highlight: true },
    { num: "04", date: "8 Juin 2026",      text: "Début de l'appel à films" },
    { num: "05", date: "6 Sep. 2026",      text: "Clôture de l'appel à films" },
    { num: "06", date: "10 & 11 Oct. 2026",text: "Projections et cérémonie du Festival George Sand du court métrage à La Châtre", highlight: true },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">

      {/* ── Barre de progression ───────────────────────────────────────── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-[200] origin-left bg-accent"
        style={{ scaleX: pageProgress }}
      />

      <Navbar />

      {/* ════════════════════════════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative overflow-hidden bg-black" style={{ height: "100svh", minHeight: "600px" }}>
        <motion.div className="absolute inset-0 z-0" style={{ y: heroImageY, scale: heroImageScale }}>
          <img src="/hero-bg.jpg" alt="Hero" className="w-full h-full object-cover" style={{ objectPosition: "70% center" }} />
        </motion.div>
        <div className="absolute inset-0 z-[1] bg-black/30" />
        <div className="absolute bottom-0 left-0 right-0 h-[75%] z-[1] bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="grain-overlay z-[2]" style={{ opacity: 0.13 }} />
        <div className="grain-overlay z-[2]" style={{ opacity: 0.06, animationDirection: "reverse", animationDuration: "0.25s" }} />

        <motion.div
          className="absolute left-0 right-0 z-10 px-6 sm:px-10 lg:px-16 xl:px-24"
          style={{ bottom: "clamp(2rem, 5vh, 4rem)", y: heroContentY, opacity: heroContentOpacity }}
        >
          <div className="max-w-2xl mx-auto lg:mx-0">
            <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="origin-left mb-6 hidden sm:block">
              <div className="flex items-center gap-4">
                <motion.div className="h-[2px] bg-primary-foreground" initial={{ width: 0 }} animate={{ width: 48 }} transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }} />
                <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.7 }} className="font-display text-xs font-bold uppercase tracking-[0.3em] text-primary-foreground">
                  Festival de cinéma · Berry · 2026
                </motion.span>
              </div>
            </motion.div>

            <h1 className="font-display font-bold uppercase tracking-tight leading-[0.92]" style={{ textShadow: "0 2px 24px rgba(0,0,0,0.6)" }}>
              {titleWords.map((word, i) => (
                <motion.span key={i} className={cn("block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl", i === 0 ? "text-white" : "text-primary-foreground")}
                  initial={{ opacity: 0, y: 60, rotateX: 40 }} animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.9, delay: 0.4 + i * 0.2, ease: [0.22, 1, 0.36, 1] }}>
                  {word}
                </motion.span>
              ))}
              <span className="block text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-white font-medium tracking-[0.15em] mt-2 overflow-hidden">
                {subtitleChars.map((char, i) => (
                  <motion.span key={i} className="inline-block" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 1.0 + i * 0.03, ease: "easeOut" }}>
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </span>
            </h1>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.6 }} className="mt-6 max-w-lg">
              <p className="text-base md:text-lg font-sans font-light leading-relaxed text-white" style={{ textShadow: "0 1px 12px rgba(0,0,0,0.9)" }}>
                Un festival de cinéma dans le Berry récompensant des courts métrages engagés, s'inspirant de la modernité des idées de George Sand.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.9 }} className="mt-6 flex flex-wrap items-start gap-3">
              <motion.div className="flex items-center gap-2 border border-primary-foreground/60 bg-black/30 backdrop-blur-sm px-4 py-2" whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400 }}>
                <Calendar className="text-primary-foreground w-4 h-4 shrink-0" />
                <span className="font-display font-bold tracking-wider text-sm text-white">10 & 11 OCT. 2026</span>
              </motion.div>
              <motion.div className="flex items-center gap-2 border border-white/40 bg-black/30 backdrop-blur-sm px-4 py-2" whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400 }}>
                <MapPin className="text-white w-4 h-4 shrink-0" />
                <span className="font-display font-semibold tracking-wider text-sm text-white">La Châtre, Berry</span>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 2.1 }} className="mt-6 flex flex-wrap gap-4">
              <Button size="lg" variant="primary" asChild className="group">
                <a href="#apropos">Découvrir le festival <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" /></a>
              </Button>
              <Button size="lg" variant="outline" asChild className="group border-2 border-primary-foreground text-primary-foreground bg-black/30 backdrop-blur-sm hover:bg-primary-foreground hover:text-black text-sm sm:text-base">
                <a href="#residence">
                  <Clock className="mr-2 w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  <span className="sm:hidden">Résidence — 8-10 mai</span>
                  <span className="hidden sm:inline">Résidence — 8 au 10 mai</span>
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1 shrink-0" />
                </a>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── Marquee #1 ──────────────────────────────────────────────────── */}
      <MarqueeStrip />

      {/* ════════════════════════════════════════════════════════════════
          2. À PROPOS
      ════════════════════════════════════════════════════════════════ */}
      <section id="apropos" className="py-24 bg-background relative overflow-hidden">
        <div className="grain-overlay" style={{ opacity: 0.035 }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-display font-bold uppercase mb-6 text-foreground">À Propos</h2>
            <p className="text-2xl md:text-3xl font-serif font-light leading-snug text-foreground max-w-3xl mx-auto">
              Un festival de cinéma récompensant les films engagés de{" "}<strong>maximum 15 minutes</strong>, ouvert à toutes et à tous, partout en France.
            </p>
          </motion.div>

          {/* Compteurs */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} className="grid grid-cols-3 gap-0 border-2 border-foreground mb-16">
            {[
              { value: 15,  suffix: " min",   label: "Durée maximale" },
              { value: 20,  suffix: " films",  label: "En compétition" },
              { value: 8,   suffix: " prix",   label: "Catégories" },
            ].map((item, i) => (
              <div key={i} className={cn("p-6 md:p-10 text-center", i < 2 ? "border-r-2 border-foreground" : "")}>
                <div className="text-4xl md:text-6xl font-display font-black text-primary mb-2">
                  <AnimatedCounter value={item.value} suffix={item.suffix} />
                </div>
                <div className="text-xs font-display font-bold uppercase tracking-[0.2em] text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Two-col : texte + portrait */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="space-y-6 text-lg text-muted-foreground">
              <div className="grid grid-cols-3 gap-0 border-2 border-foreground mb-8">
                {[
                  { label: "Formats",     value: "Fiction · Doc · Animation" },
                  { label: "Ouvert à",    value: "Pros & Amateurs" },
                  { label: "Inscription", value: "12€ par film" },
                ].map((item, i) => (
                  <div key={i} className={cn("p-4 text-center", i < 2 ? "border-r-2 border-foreground" : "")}>
                    <div className="text-xs font-display font-bold uppercase tracking-[0.2em] text-muted-foreground mb-1">{item.label}</div>
                    <div className="text-xs md:text-sm font-serif font-semibold text-foreground">{item.value}</div>
                  </div>
                ))}
              </div>
              <p>La cérémonie aura lieu les <strong className="text-foreground">10 & 11 octobre 2026</strong> à <strong className="text-foreground">La Châtre en Berry</strong>, à quelques kilomètres de Nohant. Une <strong className="text-foreground">résidence de production audiovisuelle</strong> à destination des amateurs se tiendra le week-end du 8 mai.</p>
              <p>Les films présentés doivent être liés aux idées ou à la vie de George Sand — émancipation, écologie, engagement politique, proximité du territoire, légendes — et raconter notre monde sous le prisme de sa modernité.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15 }} className="relative">
              <div className="relative overflow-hidden border-2 border-foreground" style={{ aspectRatio: "3/4" }}>
                <motion.img src="/george-sand-violet.png" alt="George Sand" className="w-full h-full object-cover object-top" initial={{ scale: 1.08 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: "easeOut" }} />
                <div className="grain-overlay" style={{ opacity: 0.1 }} />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-6 py-5">
                  <p className="font-display font-bold uppercase tracking-wider text-white text-sm">George Sand</p>
                  <p className="font-serif text-white/50 text-xs">1804 — 1876</p>
                </div>
              </div>
              <div className="absolute -bottom-3 -right-3 w-full h-full border-2 border-primary -z-10" />
            </motion.div>
          </div>

          {/* Bandeau anniversaire */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.35 }}>
            <div className="bg-foreground text-background px-10 py-6 flex items-center justify-center">
              <span className="font-display font-bold uppercase tracking-widest text-sm text-center">Dans le cadre du 150ème anniversaire de la mort de George Sand</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-12 pt-8">
              <a href="https://www.lachatre.fr/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                <img src="/logo-lachatre-png.png" alt="La Châtre" className="h-16 object-contain opacity-80 hover:opacity-100 transition-opacity" />
              </a>
              <a href="https://www.berryprovince.com/culture-et-patrimoine/george-sand-2026/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                <img src="/logo-annee-gs-dark.png" alt="Année George Sand 2026" className="h-20 object-contain opacity-80 hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Marquee #2 (noir) ───────────────────────────────────────────── */}
      <MarqueeStrip dark />

      {/* ════════════════════════════════════════════════════════════════
          3. CALENDRIER — photo de fond + timeline épurée
      ════════════════════════════════════════════════════════════════ */}
      <section id="calendrier" className="relative overflow-hidden text-white">
        {/* Photo background */}
        <div className="absolute inset-0 z-0">
          <img src="/hero-bg.jpg" alt="" className="w-full h-full object-cover" style={{ objectPosition: "60% center" }} />
          <div className="absolute inset-0 bg-black/82" />
        </div>
        <div className="grain-overlay z-[1]" style={{ opacity: 0.11 }} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
            <div className="h-[2px] w-12 bg-primary-foreground mb-6" />
            <h2 className="text-4xl md:text-6xl font-display font-bold uppercase mb-4">Calendrier</h2>
            <p className="font-serif text-white/50 max-w-xl">Les grandes étapes de l'édition 2026.</p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Ligne verticale */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-white/15" />

            <div className="space-y-0">
              {calendarItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={cn(
                    "relative pl-16 md:pl-24 pr-6 py-8 group transition-colors duration-300",
                    i < calendarItems.length - 1 ? "border-b border-white/8" : "",
                    item.highlight ? "hover:bg-white/5" : "hover:bg-white/3"
                  )}
                >
                  {/* Dot on timeline */}
                  <div className={cn(
                    "absolute left-4 md:left-5 top-1/2 -translate-y-1/2 w-4 h-4 border-2 transition-colors duration-300",
                    item.highlight
                      ? "bg-primary-foreground border-primary-foreground"
                      : "bg-transparent border-white/30 group-hover:border-primary"
                  )} />

                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-8">
                    {/* Number watermark */}
                    <span className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 font-display font-black text-6xl md:text-8xl select-none pointer-events-none text-white/4 group-hover:text-white/6 transition-colors">
                      {item.num}
                    </span>

                    <div className="flex-1">
                      <div className={cn(
                        "text-xs font-display font-bold uppercase tracking-[0.25em] mb-2",
                        item.highlight ? "text-primary-foreground" : "text-white/40"
                      )}>
                        {item.date}
                      </div>
                      <p className={cn(
                        "font-serif text-lg leading-snug max-w-xl",
                        item.highlight ? "text-white font-semibold" : "text-white/70 group-hover:text-white/90"
                      )}>
                        {item.text}
                      </p>
                    </div>

                    {item.highlight && (
                      <Trophy className="w-5 h-5 text-primary-foreground/60 shrink-0 mt-1 sm:mt-0" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          4. LA RÉSIDENCE — split écran photo / contenu
      ════════════════════════════════════════════════════════════════ */}
      <section id="residence" className="relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen lg:min-h-0">

          {/* Colonne gauche — photo plein cadre */}
          <div className="relative overflow-hidden" style={{ minHeight: "320px" }}>
            <img src="/hero-bg.jpg" alt="En tournage" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "55% center" }} />
            {/* Overlay violet pour cohérence de marque */}
            <div className="absolute inset-0 bg-primary/75" />
            <div className="grain-overlay" style={{ opacity: 0.12 }} />

            {/* Contenu superposé sur la photo */}
            <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12 lg:p-16" style={{ minHeight: "380px" }}>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <div className="h-[2px] w-12 bg-primary-foreground mb-6" />
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold uppercase text-primary-foreground mb-4 leading-tight">
                  La<br />Résidence
                </h2>
                <div className="inline-block bg-accent text-primary px-4 py-2 font-display font-bold uppercase tracking-wider text-sm mb-6">
                  Du 8 au 10 mai 2026 · La Châtre
                </div>
                <p className="text-xl font-serif text-white/80 max-w-sm leading-relaxed">
                  Apprenez les bases de la création d'un film en 3 jours, aux côtés de professionnels.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Colonne droite — contenu sur fond sombre */}
          <div className="bg-black text-white relative">
            <div className="grain-overlay" style={{ opacity: 0.08 }} />
            <div className="relative z-10 p-8 md:p-12 lg:p-16 flex flex-col justify-center h-full">
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}>

                {/* Description */}
                <p className="text-lg font-serif text-white/80 mb-8 leading-relaxed">
                  À destination de <strong className="text-white">15 non-professionnels</strong> (à partir de 14 ans). Trois jours intensifs pour créer, filmer et monter un court métrage.
                </p>

                {/* Programme */}
                <div className="space-y-0 mb-10 border border-white/10">
                  {[
                    { step: "Jour 1", label: "Atelier d'écriture de scénario" },
                    { step: "Jour 2", label: "Tournage des séquences" },
                    { step: "Jour 3", label: "Montage, mixage, étalonnage & musique à l'image" },
                  ].map((s, i) => (
                    <div key={i} className={cn("flex items-start gap-4 px-6 py-5", i < 2 ? "border-b border-white/10" : "")}>
                      <span className="font-display font-bold text-xs uppercase tracking-widest text-primary-foreground/60 pt-0.5 w-12 shrink-0">{s.step}</span>
                      <span className="font-sans text-white/80 text-sm">{s.label}</span>
                    </div>
                  ))}
                </div>

                {/* Infos pratiques */}
                <div className="grid grid-cols-2 gap-0 border border-white/10 mb-8">
                  <div className="p-5 border-r border-white/10">
                    <div className="text-xs font-display font-bold uppercase tracking-widest text-white/30 mb-1">Lieu</div>
                    <div className="font-serif text-white">La Châtre</div>
                  </div>
                  <div className="p-5">
                    <div className="text-xs font-display font-bold uppercase tracking-widest text-white/30 mb-1">Tarif</div>
                    <div className="font-display font-black text-primary-foreground text-xl">Gratuit</div>
                  </div>
                  <div className="p-5 border-t border-r border-white/10">
                    <div className="text-xs font-display font-bold uppercase tracking-widest text-white/30 mb-1">Horaires</div>
                    <div className="font-serif text-white text-sm">9h30 – 18h00</div>
                  </div>
                  <div className="p-5 border-t border-white/10">
                    <div className="text-xs font-display font-bold uppercase tracking-widest text-white/30 mb-1">Places</div>
                    <div className="font-serif text-white">15 participants</div>
                  </div>
                </div>

                <p className="text-sm font-display font-bold uppercase tracking-wider text-destructive mb-6">
                  ↳ Candidatures avant le 26 avril 2026
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="primary" asChild className="flex-1">
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSdtRkqnlMNJ7Zmi0_1yRqs-nIIX9GbcU2YKUzyPg3rRPRLl1A/viewform" target="_blank" rel="noopener noreferrer">
                      Déposer sa candidature
                    </a>
                  </Button>
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white hover:text-black flex-1" asChild>
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSdNmXw0NpdNKbJCDFc23NzlE7mGRtpUDShk4Vg1f3PGUzh-3Q/viewform?usp=header" target="_blank" rel="noopener noreferrer">
                      S'inscrire au webinaire
                    </a>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          5. CANDIDATER / PROPOSER UN FILM
          George Sand en fond décoratif
      ════════════════════════════════════════════════════════════════ */}
      <section id="proposer" className="relative overflow-hidden bg-background">
        {/* Portrait GS en arrière-plan, côté droit */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-1/2 z-0 pointer-events-none">
          <img src="/george-sand-violet.png" alt="" className="w-full h-full object-cover object-top" style={{ opacity: 0.07 }} />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-background/20" />
        </div>
        <div className="grain-overlay z-[1]" style={{ opacity: 0.04 }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <div className="h-[2px] w-12 bg-primary mb-6" />
            <h2 className="text-4xl md:text-6xl font-display font-bold uppercase text-foreground mb-4">
              Candidater
            </h2>
            <p className="text-xl font-serif text-muted-foreground max-w-xl leading-relaxed border-l-4 border-primary pl-6">
              Proposez une courte histoire qui raconte notre monde sous le prisme de la modernité de George Sand.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Colonne gauche : infos */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-10">

              {/* Conditions */}
              <div>
                <h3 className="font-display font-bold uppercase tracking-widest text-xs text-muted-foreground mb-5">Conditions d'admission</h3>
                <div className="space-y-0 border-2 border-foreground">
                  {[
                    { icon: <Play className="w-4 h-4" />, text: "Fiction, documentaire ou animation" },
                    { icon: <Clock className="w-4 h-4" />, text: "Durée inférieure à 15 minutes" },
                    { icon: <Trophy className="w-4 h-4" />, text: "Lié aux idées ou à la vie de George Sand" },
                  ].map((item, i) => (
                    <div key={i} className={cn("flex items-center gap-4 px-6 py-4 group hover:bg-foreground hover:text-background transition-colors", i < 2 ? "border-b-2 border-foreground" : "")}>
                      <span className="text-primary group-hover:text-background transition-colors">{item.icon}</span>
                      <span className="font-sans text-foreground group-hover:text-background transition-colors">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Thèmes */}
              <div>
                <h3 className="font-display font-bold uppercase tracking-widest text-xs text-muted-foreground mb-5">Exemples de thèmes</h3>
                <div className="flex flex-wrap gap-2">
                  {["Émancipation", "Écologie", "Engagement politique", "Proximité du territoire", "Légendes"].map((theme) => (
                    <span key={theme} className="px-4 py-2 border-2 border-foreground font-display text-sm uppercase tracking-wide hover:bg-foreground hover:text-background transition-colors cursor-default">
                      {theme}
                    </span>
                  ))}
                </div>
              </div>

              {/* Dépôt */}
              <div className="bg-foreground text-background p-8">
                <div className="text-xs font-display font-bold uppercase tracking-widest text-background/50 mb-4">Dépôt des films</div>
                <p className="font-display font-bold text-2xl mb-2">8 juin — 6 sept. 2026</p>
                <p className="font-serif text-background/70 text-sm mb-6">Ouvert à toutes et à tous, professionnels ou amateurs.</p>
                <div className="flex items-center justify-between border-t border-background/20 pt-4">
                  <span className="font-display font-bold uppercase text-xs tracking-widest text-background/50">Frais d'inscription</span>
                  <span className="font-display font-black text-2xl text-primary-foreground">12€</span>
                </div>
              </div>
            </motion.div>

            {/* Colonne droite : formulaire alerte */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-col justify-start">
              <div className="border-2 border-foreground bg-background p-8 md:p-10">
                <div className="w-12 h-[3px] bg-primary mb-8" />
                <h3 className="text-2xl font-display font-bold uppercase mb-2 text-foreground">
                  Être alerté dès l'ouverture
                </h3>
                <p className="font-serif text-muted-foreground mb-8">
                  Soyez informé par mail dès l'ouverture du concours le <strong className="text-foreground">8 juin 2026</strong>.
                </p>
                <form onSubmit={handleSubscribe} className="space-y-5">
                  <div className="space-y-2">
                    <label htmlFor="email" className="font-display font-bold text-xs uppercase tracking-widest text-foreground">
                      Adresse e-mail
                    </label>
                    <Input id="email" type="email" required placeholder="votre@email.com" className="border-2 border-foreground focus-visible:border-primary h-12" />
                  </div>
                  <Button type="submit" variant="primary" className="w-full h-12 font-display uppercase tracking-wider">
                    M'alerter à l'ouverture
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Aucun spam — uniquement l'annonce d'ouverture du concours.
                  </p>
                </form>

                {/* Séparateur */}
                <div className="border-t-2 border-foreground mt-8 pt-8">
                  <p className="font-display font-bold uppercase text-xs tracking-widest text-muted-foreground mb-4">Candidatures pour la Résidence</p>
                  <Button variant="outline" className="w-full border-2 border-foreground h-12 font-display uppercase tracking-wider" asChild>
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSdtRkqnlMNJ7Zmi0_1yRqs-nIIX9GbcU2YKUzyPg3rRPRLl1A/viewform" target="_blank" rel="noopener noreferrer">
                      Candidater à la résidence →
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Marquee #3 ──────────────────────────────────────────────────── */}
      <MarqueeStrip dark />

      {/* ════════════════════════════════════════════════════════════════
          6. SÉLECTION & PRIX — flip cards
      ════════════════════════════════════════════════════════════════ */}
      <section id="prix" className="py-24 bg-background relative overflow-hidden">
        <div className="grain-overlay" style={{ opacity: 0.03 }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-bold uppercase mb-6 text-foreground">Sélection & Prix</h2>
            <p className="text-xl font-serif text-muted-foreground">
              <strong>20 courts-métrages</strong> seront sélectionnés pour participer à la compétition. Annonce fin septembre 2026.
            </p>
            <p className="text-xs font-display uppercase tracking-widest text-muted-foreground/40 mt-4">Survolez les cartes pour découvrir chaque prix ↓</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {prizes.map((prix, i) => (
              <FlipCard key={i} name={prix.name} description={prix.description} index={i} />
            ))}
          </div>

          <div className="bg-accent px-8 md:px-16 py-12 text-center">
            <div className="h-[3px] w-12 bg-foreground mx-auto mb-6" />
            <h3 className="text-2xl md:text-3xl font-display font-bold uppercase mb-6 text-foreground">Un Tremplin pour les Créateurs</h3>
            <p className="font-serif text-lg max-w-4xl mx-auto text-foreground/80">
              Les films lauréats seront projetés et diffusés dans des cinémas de la région Centre.{" "}<br className="hidden md:block" />
              Chaque lauréat recevra une récompense (matériel technique, accompagnement de projet, aide à la diffusion).
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          7. CONTACT & ÉQUIPE
      ════════════════════════════════════════════════════════════════ */}
      <section id="contact" className="relative overflow-hidden text-background">
        <div className="absolute inset-0 z-0">
          <img src="/hero-bg.jpg" alt="" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-primary/90" />
        </div>
        <div className="grain-overlay z-[1]" style={{ opacity: 0.1 }} />

        <div className="relative z-10 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="h-[2px] w-12 bg-primary-foreground mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-display font-bold uppercase mb-6 text-background">Contact & Équipe</h2>
              <p className="text-xl font-serif text-background/60 max-w-3xl mx-auto">
                Les responsables du festival sont <strong className="text-background">Pauline Michel</strong> et{" "}
                <strong className="text-background">Thibaud Deschamps</strong>, deux jeunes professionnels attachés au Berry.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
              {[
                { name: "Pauline Michel",   role: "Productrice audiovisuelle", photo: "/Pauline.jpg",  email: "pauline.c.michel@gmail.com", phone: "06 81 79 53 09", tag: "Contact Prix" },
                { name: "Thibaud Deschamps", role: "Monteur & Réalisateur",    photo: "/Thibaud.jpg", email: "thib.deschamps@hotmail.fr",   phone: "06 75 13 17 54", tag: "Contact Résidence" },
              ].map((person, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="bg-background p-8">
                  <div className="flex items-start gap-6">
                    <div className="relative w-20 h-20 shrink-0 overflow-hidden border border-border group">
                      <img src={person.photo} alt={person.name} className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xl font-display font-bold uppercase mb-1 text-foreground">{person.name}</h3>
                      <p className="font-sans text-primary font-bold text-sm mb-4">{person.role}</p>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p className="flex items-center gap-2 flex-wrap"><Mail className="w-3.5 h-3.5 shrink-0 text-primary" /><span>{person.email}</span></p>
                        <p className="flex items-center gap-2"><span className="font-bold text-primary">✆</span> {person.phone}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-border">
                    <span className="inline-block bg-primary text-primary-foreground text-xs px-3 py-1.5 uppercase tracking-widest font-display font-bold">{person.tag}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Équipe élargie */}
            <div className="mb-20">
              <h3 className="text-xs font-display font-bold uppercase tracking-[0.2em] text-background/50 mb-8">Association Culture en Vallée Noire</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mb-16">
                {[
                  { name: "Xavier Couture",         role: "Président",          photo: "/Xavier.jpg" },
                  { name: "Florence de Soos",        role: "Trésorière",         photo: "/Florence.jpg" },
                  { name: "Jean-Baptiste Deschamps", role: "Secrétaire général", photo: "/Jean-Baptiste.jpg" },
                ].map((member, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="text-center group">
                    <div className="relative w-24 h-24 mx-auto mb-4 overflow-hidden">
                      <img src={member.photo} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" />
                    </div>
                    <p className="font-display font-bold text-sm text-primary-foreground">{member.name}</p>
                    <p className="font-sans text-xs text-background/50">{member.role}</p>
                  </motion.div>
                ))}
              </div>

              <h3 className="text-xs font-display font-bold uppercase tracking-[0.2em] text-background/50 mb-8">Festival George Sand du court métrage</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                {[
                  { name: "Thibaud Deschamps",   role: "Coordinateur résidence",      photo: "/Thibaud.jpg" },
                  { name: "Pauline Michel",       role: "Coordinatrice prix",          photo: "/Pauline.jpg" },
                  { name: "Blandine Chevestrier", role: "Coordinatrice communication", photo: "/Blandine.jpg" },
                  { name: "Müge Altay",           role: "Coordinatrice partenariats",  photo: "/Muge.jpg" },
                ].map((member, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="text-center group">
                    <div className="relative w-24 h-24 mx-auto mb-4 overflow-hidden">
                      <img src={member.photo} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" />
                    </div>
                    <p className="font-display font-bold text-sm text-primary-foreground">{member.name}</p>
                    <p className="font-sans text-xs text-background/50">{member.role}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          8. PARTENAIRES
      ════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-background border-t border-border relative overflow-hidden">
        <div className="grain-overlay" style={{ opacity: 0.03 }} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="h-[2px] w-12 bg-primary mx-auto mb-6" />
            <h2 className="text-3xl font-display font-bold uppercase mb-4 text-foreground">Nos Partenaires</h2>
            <p className="font-serif text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
              Nous remercions chaleureusement tous nos partenaires sans qui ce festival n'aurait pas pu voir le jour.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="flex justify-center items-center gap-12 flex-wrap mb-10">
            <img src="/CVN_logo-02.png" alt="Culture en Vallée Noire" className="h-24 object-contain opacity-70 hover:opacity-100 transition-opacity" />
            <a href="https://www.lachatre.fr/" target="_blank" rel="noopener noreferrer" className="flex items-center">
              <img src="/logo-lachatre-png.png" alt="La Châtre" className="h-16 object-contain opacity-70 hover:opacity-100 transition-opacity" />
            </a>
            <a href="https://www.berryprovince.com/culture-et-patrimoine/george-sand-2026/" target="_blank" rel="noopener noreferrer" className="flex items-center">
              <img src="/logo-annee-gs-dark.png" alt="Année George Sand 2026" className="h-24 object-contain opacity-70 hover:opacity-100 transition-opacity" />
            </a>
            <a href="https://www.nouvelles-renaissances.com/" target="_blank" rel="noopener noreferrer" className="flex items-center">
              <img src="/Nouvelles_Rennaissances_Label_Noir.png" alt="Nouvelles Renaissances" className="h-24 object-contain opacity-70 hover:opacity-100 transition-opacity" />
            </a>
          </motion.div>

          <p className="font-serif text-muted-foreground mb-6">
            Porté par l'association <strong className="text-foreground">Culture en Vallée Noire</strong>, présidée par Xavier Couture.
          </p>
          <a href="mailto:cultureenvalleenoire@gmail.com" className="inline-flex items-center gap-2 text-primary font-bold hover:underline text-sm">
            <Mail className="w-4 h-4" />
            cultureenvalleenoire@gmail.com
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
