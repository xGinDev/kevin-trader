/**
 * Todo el contenido de la one page vive aquí.
 * Los valores entre [corchetes] y los marcados con PLACEHOLDER son provisionales:
 * cámbialos por los reales y no hace falta tocar ningún componente.
 */

// ─── Identidad ──────────────────────────────────────────────────────────────

export const site = {
  name: "Kevin Jaramillo", // PLACEHOLDER
  initials: "KJ", // PLACEHOLDER: iniciales del Monogram hasta tener logo
  city: "Popayán", // PLACEHOLDER
  country: "Colombia", // PLACEHOLDER
  copyrightYear: 2026,
  metaTitle: "Kevin Jaramillo · Trader y educador", // PLACEHOLDER
  metaDescription:
    "Te enseño a operar con un plan y el riesgo definido antes de entrar. Mentorías 1:1, curso de fundamentos y comunidad de revisión semanal.",
};

// ─── Enlaces ────────────────────────────────────────────────────────────────

export const links = {
  /** Solo dígitos, con indicativo de país y sin "+". PLACEHOLDER */
  whatsappNumber: "570000000000",
  whatsappMessage: "Hola, vengo de tu página y quiero saber más sobre tus servicios.",
  /** Agenda de la llamada inicial (Cal.com o Calendly). PLACEHOLDER */
  bookingUrl: "https://cal.com/[usuario]/llamada-inicial",
  bookingLabel: "[Cal.com / Calendly]", // PLACEHOLDER
  youtube: "https://youtube.com/@[usuario]", // PLACEHOLDER
  instagram: "https://instagram.com/[usuario]", // PLACEHOLDER
  tiktok: "https://tiktok.com/@[usuario]", // PLACEHOLDER
};

export const whatsappHref = `https://wa.me/${links.whatsappNumber}?text=${encodeURIComponent(links.whatsappMessage)}`;

// ─── Navegación ─────────────────────────────────────────────────────────────

export const sectionIds = {
  hero: "inicio",
  about: "sobre-mi",
  method: "enfoque",
  services: "servicios",
  howWeStart: "como-empezamos",
  testimonials: "testimonios",
  content: "contenido",
  calculator: "calculadora",
  faq: "preguntas",
  contact: "contacto",
} as const;

type NavItem = { id: string; label: string };

/** Header desktop */
export const headerNav: NavItem[] = [
  { id: sectionIds.about, label: "Sobre mí" },
  { id: sectionIds.method, label: "Mi enfoque" },
  { id: sectionIds.services, label: "Servicios" },
  { id: sectionIds.testimonials, label: "Testimonios" },
  { id: sectionIds.faq, label: "Preguntas" },
];

/** Menú mobile (Sheet) */
export const sheetNav: NavItem[] = [
  { id: sectionIds.about, label: "Sobre mí" },
  { id: sectionIds.method, label: "Mi enfoque" },
  { id: sectionIds.services, label: "Servicios" },
  { id: sectionIds.howWeStart, label: "Cómo empezamos" },
  { id: sectionIds.testimonials, label: "Testimonios" },
  { id: sectionIds.content, label: "Contenido" },
  { id: sectionIds.calculator, label: "Calculadora" },
  { id: sectionIds.faq, label: "Preguntas" },
];

export const footerNav: NavItem[] = [
  { id: sectionIds.about, label: "Sobre mí" },
  { id: sectionIds.method, label: "Mi enfoque" },
  { id: sectionIds.services, label: "Servicios" },
  { id: sectionIds.calculator, label: "Calculadora" },
  { id: sectionIds.contact, label: "Contacto" },
];

/** El CTA único de la página: mismo texto en header, hero, cómo empezamos y contacto. */
export const ctaLabel = "Hablemos";

// ─── Imágenes ───────────────────────────────────────────────────────────────

/**
 * Pon el archivo en /public y escribe la ruta (por ejemplo "/retrato.jpg").
 * Con src: null se muestra el recuadro provisional del diseño.
 */
export const images = {
  portrait: {
    src: null as string | null, // PLACEHOLDER
    alt: "Retrato de Kevin Jaramillo", // PLACEHOLDER
    placeholderTitle: "Retrato profesional",
    placeholderNote:
      "Medio cuerpo, luz lateral suave, fondo neutro oscuro, mirada a cámara. Sin pantallas múltiples, autos ni billetes.",
    placeholderNoteMobile: "Recorte 7:6 del mismo retrato del desktop, centrado en el rostro.",
  },
  working: {
    src: null as string | null, // PLACEHOLDER
    alt: "Kevin Jaramillo revisando su diario de operaciones", // PLACEHOLDER
    placeholderTitle: "Foto trabajando",
    placeholderNote:
      "Revisando su diario de operaciones, en papel o pantalla. Plano medio, sin mostrar saldos ni ganancias.",
    placeholderNoteMobile: "Revisando su diario de operaciones. Sin saldos ni ganancias a la vista.",
  },
};

// ─── Hero ───────────────────────────────────────────────────────────────────

export const hero = {
  eyebrow: `${site.name}, trader y educador en ${site.city}, ${site.country}`,
  title: "Te enseño a operar con un plan y el riesgo definido antes de entrar.",
  intro:
    "Opero forex e índices desde 2016. Acompaño a traders que quieren dejar de improvisar, con mentorías 1:1, un curso de fundamentos y una comunidad de revisión semanal.", // PLACEHOLDER (años y mercados)
  introMobile:
    "Opero forex e índices desde 2016. Acompaño a traders que quieren dejar de improvisar.", // PLACEHOLDER
  secondaryCta: "Ver cómo trabajo",
  note: "Sin señales y sin promesas de rentabilidad.",
};

// ─── Sobre mí ───────────────────────────────────────────────────────────────

export const about = {
  title: "Sobre mí",
  paragraphs: [
    "Empecé a operar en 2016 con lo que veía en redes: entradas por intuición, sin stop y con demasiado tamaño. En mi primer año perdí más de la mitad de la cuenta.",
    "Lo que me sacó de ahí no fue un indicador. Fue escribir un plan y respetar un límite de pérdida por operación. Desde entonces registro cada operación en un diario y lo reviso cada semana.",
    "Eso es lo que enseño: un proceso que puedas repetir, no una fórmula para hacerte rico.",
  ], // PLACEHOLDER (historia real)
  /** Solo cifras verificables. PLACEHOLDER */
  stats: [
    { value: 9, label: "años operando con cuenta propia" },
    { value: 2, label: "mercados: forex e índices" },
    { value: 180, label: "alumnos en mentoría y curso" },
    { value: 1200, label: "sesiones de revisión de operaciones" },
  ],
  statsNote: "Cifras al [mes, año]. Puedes pedirme el respaldo de cualquiera.", // PLACEHOLDER
};

// ─── Mi enfoque ─────────────────────────────────────────────────────────────

export const method = {
  title: "Mi enfoque",
  subtitle: "Cuatro pasos, siempre en este orden. Son los mismos que sigo en mi cuenta.",
  subtitleMobile: "Cuatro pasos, siempre en este orden.",
  steps: [
    {
      title: "Riesgo primero",
      body: "Defino cuánto puedo perder antes de buscar una entrada. Ninguna operación arriesga más del 1 % de la cuenta.",
    },
    {
      title: "Plan escrito",
      body: "Antes de abrir el gráfico sé qué mercados opero, en qué horario y qué tiene que pasar para entrar.",
    },
    {
      title: "Ejecución sin improvisar",
      body: "Si la entrada no cumple el plan, no entro. Si el precio toca el stop, salgo. No muevo niveles a mitad de camino.",
    },
    {
      title: "Revisión semanal",
      body: "Cada viernes reviso el diario: qué hice, qué no respeté y qué ajusto para la semana siguiente.",
    },
  ],
};

// ─── Servicios ──────────────────────────────────────────────────────────────

/** Opciones de "¿Qué te interesa?" en el formulario. */
export const interestOptions = [
  { value: "curso", label: "Curso de fundamentos" },
  { value: "mentoria", label: "Mentoría 1:1" },
  { value: "comunidad", label: "Comunidad de revisión" },
  { value: "no-se", label: "Todavía no lo sé" },
] as const;

export type InterestValue = (typeof interestOptions)[number]["value"];

export const services = {
  title: "Servicios",
  subtitle: "Tres formas de trabajar juntos, según el punto en el que estás.",
  subtitleMobile: "Tres formas de trabajar juntos.",
  metaLabels: { format: "Formato", duration: "Duración", price: "Inversión" },
  items: [
    {
      title: "Curso de fundamentos",
      forWho: "Para quien empieza desde cero y quiere bases sólidas antes de arriesgar dinero real.",
      includes: ["12 módulos en video", "Plantillas de plan y diario de operaciones", "Ejercicios en cuenta demo"],
      format: "Online, a tu ritmo",
      duration: "6 semanas sugeridas",
      price: "Consulta", // PLACEHOLDER
      cta: "Quiero el curso",
      interest: "curso" as InterestValue,
    },
    {
      title: "Mentoría 1:1",
      forWho: "Para quien ya opera y quiere ordenar su proceso con alguien que revise cada decisión.",
      includes: ["Revisión de tu diario de operaciones", "Plan de trading escrito contigo", "Sesiones en vivo con el mercado abierto"],
      format: "Videollamada individual",
      duration: "8 semanas",
      price: "Consulta", // PLACEHOLDER
      cta: "Quiero la mentoría",
      interest: "mentoria" as InterestValue,
    },
    {
      title: "Comunidad de revisión",
      forWho: "Para quien ya opera y quiere revisar sus operaciones con otros traders cada semana.",
      includes: ["Revisión semanal en vivo", "Lectura del mercado cada lunes", "Canal privado para preguntas"],
      format: "Grupo privado online",
      duration: "Mensual, sin permanencia",
      price: "Consulta", // PLACEHOLDER
      cta: "Quiero unirme",
      interest: "comunidad" as InterestValue,
    },
  ],
};

// ─── Cómo empezamos ─────────────────────────────────────────────────────────

export const howWeStart = {
  title: "Cómo empezamos",
  subtitle: "Antes de proponerte nada, quiero entender cómo operas hoy.",
  steps: [
    {
      title: "Llamada inicial",
      body: "30 minutos, sin costo. Me cuentas cómo operas, qué mercados sigues y qué te gustaría cambiar.",
    },
    {
      title: "Diagnóstico",
      body: "Reviso tus últimas operaciones o tu punto de partida y te digo con honestidad qué cambiaría primero.",
    },
    {
      title: "Plan",
      body: "Te propongo el formato que más te sirve. Si todavía no es el momento, también te lo digo.",
    },
  ],
  bookingCta: "Agendar la llamada inicial",
};

// ─── Testimonios ────────────────────────────────────────────────────────────

export const testimonials = {
  title: "Lo que cuentan del proceso",
  subtitle:
    "Testimonios publicados con consentimiento. Hablan de cómo cambió su forma de operar, no de cuánto ganaron.",
  subtitleMobile: "Con consentimiento. Sobre el aprendizaje, no sobre ganancias.",
  /** Solo con consentimiento escrito; nombre e inicial del apellido. PLACEHOLDER */
  items: [
    {
      quote:
        "Lo que más me cambió fue escribir el plan antes de abrir el gráfico. Dejé de entrar por impulso y empecé a revisar mis operaciones cada viernes.",
      name: "Laura G.",
      context: "Mentoría 1:1, 2025",
    },
    {
      quote:
        "Creía que necesitaba una estrategia nueva. Lo que necesitaba era dejar de arriesgar el 5 % por operación. Ahora sé cuánto puedo perder antes de entrar.",
      name: "Andrés M.",
      context: "Curso de fundamentos, 2025",
    },
    {
      quote:
        "Las revisiones de los viernes me obligaron a mirar mis errores con datos y no con emociones. Es lo más útil que me llevo.",
      name: "Camila R.",
      context: "Comunidad de revisión, 2024",
    },
  ],
};

// ─── Contenido ──────────────────────────────────────────────────────────────

export const content = {
  title: "Contenido",
  subtitle: "Cada semana publico análisis, errores reales y cómo los corrijo.",
  subtitleMobile: "Análisis y errores reales cada semana.",
  /** Títulos de ejemplo: reemplazar por los últimos videos y posts reales. PLACEHOLDER */
  items: [
    {
      type: "video" as const,
      title: "Cómo calculo el tamaño de posición antes de cada entrada",
      meta: "YouTube, 12 min",
      href: links.youtube,
      thumbnail: null as string | null,
    },
    {
      type: "video" as const,
      title: "Revisión de mi semana: dos operaciones que no debí tomar",
      meta: "YouTube, 18 min",
      href: links.youtube,
      thumbnail: null as string | null,
    },
    {
      type: "video" as const,
      title: "Por qué no muevo el stop una vez que entro",
      meta: "YouTube, 9 min",
      href: links.youtube,
      thumbnail: null as string | null,
    },
    {
      type: "post" as const,
      title: "3 errores que cometí en mi primer año",
      meta: "Instagram, carrusel",
      href: links.instagram,
      thumbnail: null as string | null,
    },
  ],
};

// ─── Calculadora ────────────────────────────────────────────────────────────

export const calculator = {
  sectionTitle: "Herramienta gratuita",
  sectionSubtitle:
    "La uso antes de cada operación. Úsala tú también: pones tu capital, tu riesgo, la entrada y el stop, y te dice qué tamaño abrir.",
  sectionSubtitleMobile:
    "Pones tu capital, tu riesgo, la entrada y el stop, y te dice qué tamaño abrir.",
  title: "Calculadora de tamaño de posición",
  description: "Define cuánto arriesgas antes de entrar. Se calcula mientras escribes.",
  riskHelper: "Recomendado: entre 0,5 % y 1 %.",
  maxRiskPercent: 10,
};

// ─── Preguntas frecuentes ───────────────────────────────────────────────────

export const faq = {
  title: "Preguntas frecuentes",
  subtitle: "¿Te queda otra duda? Escríbeme y te respondo personalmente.",
  items: [
    {
      question: "¿Necesito experiencia previa?",
      answer: "No. El curso empieza desde cero. Para la mentoría conviene que ya hayas operado, aunque sea en cuenta demo.",
    },
    {
      question: "¿Cuánto capital necesito?",
      answer:
        "Para aprender, ninguno: empiezas en cuenta demo. Cuando pases a real, hazlo con un monto que puedas perder sin que afecte tu vida.",
    },
    {
      question: "¿Das señales de trading?",
      answer: "No. No te digo qué comprar ni cuándo. Te enseño a construir tu propio plan y a seguirlo.",
    },
    {
      question: "¿Garantizas resultados?",
      answer:
        "No. Nadie puede garantizarlos y desconfiaría de quien lo haga. Lo que sí te garantizo es un método claro, revisión honesta de tus operaciones y que vas a saber cuánto arriesgas en cada una.",
    },
    {
      question: "¿En qué horario son las sesiones?",
      answer:
        "Las sesiones 1:1 se agendan en horario de [zona horaria]. La revisión semanal de la comunidad queda grabada para quien no pueda conectarse.", // PLACEHOLDER
    },
  ],
};

// ─── Contacto ───────────────────────────────────────────────────────────────

export const contact = {
  title: ctaLabel,
  intro: "Cuéntame en qué punto estás. Si no soy la persona indicada para ayudarte, también te lo digo.",
  whatsappOption: {
    title: "Escribir por WhatsApp",
    note: "Respondo de lunes a viernes, de 9:00 a 18:00.", // PLACEHOLDER
  },
  bookingOption: {
    title: "Agendar la llamada inicial",
    note: `30 minutos por videollamada en ${links.bookingLabel}.`,
  },
  formNote: "O usa el formulario y te respondo por email o WhatsApp.",
  responseTime: "menos de 48 horas hábiles", // PLACEHOLDER
};

export const experienceLevels = [
  { value: "empezando", label: "Estoy empezando" },
  { value: "sin-consistencia", label: "Ya opero, pero sin consistencia" },
  { value: "afinar", label: "Opero con plan y quiero afinarlo" },
] as const;

// ─── Aviso de riesgo ────────────────────────────────────────────────────────

export const disclaimer = {
  compact:
    "El trading implica riesgo de pérdida de capital. Este contenido es educativo, no asesoría financiera personalizada.",
  fullTitle: "Aviso de riesgo",
  full: "El trading implica riesgo de pérdida de capital, incluso de la totalidad de lo invertido. Los resultados pasados no garantizan resultados futuros. Todo el contenido de este sitio es educativo y no constituye asesoría financiera personalizada ni una recomendación de compra o venta. Opera solo con dinero que puedas permitirte perder. [Ajustar a la regulación del país donde ofreces tus servicios.]", // PLACEHOLDER
  copyrightNote: "Contenido educativo.",
};
