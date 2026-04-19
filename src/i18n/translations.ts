// ============================================
// Translations — LV & EN
// Add new keys to BOTH lv and en blocks.
// ============================================

export type Lang = "lv" | "en";

export const LANGUAGES: { code: Lang; label: string; flag: string }[] = [
  { code: "lv", label: "LV", flag: "🇱🇻" },
  { code: "en", label: "EN", flag: "🇬🇧" },
];

export const translations = {
  lv: {
    // Header
    "header.brand": "PriceLab",
    "header.tagline": "Web Calculator",
    "header.reset": "Sākt no jauna",

    // Hero
    "hero.badge": "Reālas cenas · Latvijas tirgus · Bez slēptām maksām",
    "hero.titleA": "Cik maksā",
    "hero.titleB": "jūsu mājaslapa",
    "hero.subtitle":
      "Atbildiet uz dažiem jautājumiem un saņemiet precīzu cenu diapazonu reāllaikā. Pilns kopsavilkums un piedāvājums — bez reģistrācijas.",
    "hero.cta": "Sākt aprēķinu",
    "hero.badge1.title": "Reāllaika aprēķins",
    "hero.badge1.text": "Cena mainās ar katru izvēli",
    "hero.badge2.title": "Bez saistībām",
    "hero.badge2.text": "Tikai indikatīva tāme",
    "hero.badge3.title": "Caurspīdīgs sadalījums",
    "hero.badge3.text": "Redzi par ko maksā",

    // Steps
    "steps.type": "Tips",
    "steps.sections": "Sadaļas",
    "steps.features": "Funkcijas",
    "steps.materials": "Materiāli",
    "steps.assets": "Jau ir",
    "steps.design": "Dizains",
    "steps.urgency": "Termiņš",
    "steps.maintenance": "Uzturēšana",

    // Step questions
    "step0.title": "Kāda veida mājaslapa?",
    "step0.subtitle": "Izvēlieties projektam vistuvāko tipu.",
    "step1.title": "Cik sadaļu būs mājaslapā?",
    "step1.subtitle": "Sadaļa = atsevišķa lapa vai liels bloks (Sākums, Par mums, Pakalpojumi utt.)",
    "step2.title": "Kādas funkcijas vajag?",
    "step2.subtitle": "Atzīmējiet visu, kas jums nepieciešams. Cenas redzamas blakus.",
    "step3.title": "Kas mums jāizveido jums?",
    "step3.subtitle": "Atzīmējiet, ja jums vajag, lai mēs sagatavojam.",
    "step3.note": "💡 Ja izvēlēsieties \"Viss no nulles\", atsevišķās pozīcijas tiks ignorētas.",
    "step4.title": "Kas jums jau ir gatavs?",
    "step4.subtitle": "Saņemiet atlaidi par materiāliem, ko sniedzat jūs.",
    "step5.title": "Kāds dizaina līmenis?",
    "step5.subtitle": "No template līdz pilnībā unikālam.",
    "step6.title": "Cik ātri vajag gatavu?",
    "step6.subtitle": "Steidzamība ietekmē galīgo cenu.",
    "step7.title": "Vai vajag uzturēšanu?",
    "step7.subtitle": "Mēneša maksa pēc projekta nodošanas — neietilpst gala cenā.",

    // Feature categories
    "features.essential": "Pamata",
    "features.marketing": "Marketings & SEO",
    "features.ecommerce": "E-komercija",
    "features.advanced": "Advanced",

    // Nav
    "nav.back": "Atpakaļ",
    "nav.next": "Tālāk",
    "nav.step": "Solis",

    // Common
    "common.included": "iekļauts",
    "common.optional": "(neobligāti)",
    "common.required": "*",
    "common.perMonth": "/mēn.",

    // Result panel
    "result.placeholder.title": "Sāciet ar mājaslapas tipu",
    "result.placeholder.text":
      "Izvēlieties projekta veidu kreisajā pusē, lai redzētu cenu aprēķinu reāllaikā.",
    "result.heading": "Jūsu mājaslapas cena",
    "result.marketRange": "Tipiska tirgus cena šādam projektam:",
    "result.savings": "Ietaupījums no jūsu materiāliem: ~",
    "result.recommended.title": "Recommended pakete",
    "result.recommended.badge": "Labākā izvēle",
    "result.recommended.text":
      "Premium dizains, prioritārs atbalsts, paplašinātas funkcijas — labākais ROI ilgtermiņā.",
    "result.cheaper": "Kā samazināt",
    "result.better": "Kā uzlabot",
    "result.breakdown": "Cenas sadalījums",
    "result.admin.title": "Iekšēji (admin)",
    "result.admin.show": "Rādīt",
    "result.admin.hide": "Slēpt",
    "result.admin.cost": "Izmaksas (30%)",
    "result.admin.profit": "Peļņa (70%)",
    "result.admin.note":
      "Aprēķināts no vidējās cenas. Klients to neredz.",

    // Lead form
    "lead.empty": "Vispirms izvēlieties mājaslapas tipu, lai aprēķinātu cenu.",
    "lead.title": "Saņemt precīzu piedāvājumu",
    "lead.subtitle":
      "Atstājiet kontaktus — sagatavosim individuālu tāmi 24h laikā.",
    "lead.field.name": "Vārds",
    "lead.field.contact": "E-pasts vai tālrunis",
    "lead.field.company": "Uzņēmums",
    "lead.field.comments": "Papildu komentāri",
    "lead.placeholder.name": "Jānis Bērziņš",
    "lead.placeholder.contact": "janis@example.lv",
    "lead.placeholder.company": "SIA Piemērs",
    "lead.placeholder.comments":
      "Pastāstiet vairāk par projektu, atsauces uz patīkamām mājaslapām...",
    "lead.estimate": "Aplēstā cena:",
    "lead.submit": "Saņemt precīzu piedāvājumu",
    "lead.disclaimer":
      "Nospiežot pogu, atveras WhatsApp / e-pasts ar pilnu kopsavilkumu.",
    "lead.success.title": "Pieprasījums sagatavots!",
    "lead.success.text":
      "Izvēlieties, kā nosūtīt — visi dati un cena jau ir aizpildīti.",
    "lead.success.whatsapp": "WhatsApp",
    "lead.success.email": "E-pasts",
    "lead.success.edit": "Rediģēt datus",
    "lead.error.name": "Vārds vismaz 2 simboli",
    "lead.error.contact": "Norādiet e-pastu vai telefonu",
    "lead.error.max": "Maks. simbolu skaits sasniegts",

    // Lead summary (WhatsApp/email body)
    "summary.heading": "👋 Jauns mājaslapas pieprasījums",
    "summary.name": "Vārds",
    "summary.contact": "Kontakts",
    "summary.company": "Uzņēmums",
    "summary.project": "📋 PROJEKTS",
    "summary.type": "Tips",
    "summary.sections": "Sadaļas",
    "summary.design": "Dizains",
    "summary.deadline": "Termiņš",
    "summary.features": "⚙️ FUNKCIJAS:",
    "summary.assets": "✅ JAU IR:",
    "summary.maintenance": "🔧 Uzturēšana:",
    "summary.price": "💰 APLĒSTĀ CENA",
    "summary.range": "Diapazons",
    "summary.average": "Vidēji",
    "summary.tier": "Līmenis",
    "summary.comments": "💬 KOMENTĀRI:",
    "summary.subject": "Mājaslapas pieprasījums — ",

    // Footer
    "footer.text":
      "Cenas balstītas uz vidējām likmēm Latvijas tirgū maziem web studio · Galīgā cena tiek apstiprināta pēc projekta brīfa",

    // Tier descriptions
    "tier.budget.label": "Budget",
    "tier.budget.description":
      "Vienkāršs, bet profesionāls risinājums maziem biznesiem un startupiem.",
    "tier.standard.label": "Standard",
    "tier.standard.description":
      "Lielākajai daļai biznesu — labs balanss starp cenu un funkcionalitāti.",
    "tier.advanced.label": "Advanced",
    "tier.advanced.description":
      "Bagātīgs ar funkcijām, custom dizains, augstas kvalitātes risinājums.",
    "tier.premium.label": "Premium",
    "tier.premium.description":
      "Sarežģīti risinājumi, custom UI/UX, pilna funkcionalitāte.",

    // Website types
    "wt.landing.label": "Landing Page",
    "wt.landing.description": "Viena lapa ar skaidru CTA — produkts, pasākums, kampaņa",
    "wt.business.label": "Biznesa mājaslapa",
    "wt.business.description": "Klasiska uzņēmuma vizītkarte ar pakalpojumiem un kontaktiem",
    "wt.restaurant.label": "Restorāns / kafejnīca",
    "wt.restaurant.description": "Ēdienkarte, galda rezervācija, atrašanās vieta",
    "wt.portfolio.label": "Portfolio",
    "wt.portfolio.description": "Radoša persona vai studija — darbu galerija un par mani",
    "wt.ecommerce.label": "E-veikals",
    "wt.ecommerce.description": "Pilna pirkšanas plūsma — produkti, grozs, maksājumi",
    "wt.booking.label": "Booking sistēma",
    "wt.booking.description": "Pierakstu/rezervāciju sistēma ar kalendāru un apmaksu",
    "wt.custom.label": "Custom risinājums",
    "wt.custom.description": "Web app, dashboard, SaaS, sarežģīta integrācija",

    // Section tiers
    "sec.1-3": "1–3 sadaļas",
    "sec.4-6": "4–6 sadaļas",
    "sec.7-10": "7–10 sadaļas",
    "sec.10+": "10+ sadaļas",

    // Features
    "f.contact_form": "Kontaktu forma",
    "f.whatsapp": "WhatsApp / Telegram",
    "f.google_maps": "Google Maps",
    "f.gallery": "Galerija",
    "f.reviews": "Atsauksmes",
    "f.google_reviews": "Google Reviews integrācija",
    "f.animations": "Animācijas",
    "f.multilang": "Multi-language",
    "f.blog": "Blogs",
    "f.seo": "SEO optimizācija",
    "f.domain_hosting": "Domēns / hostings",
    "f.performance": "Performance optimizācija",
    "f.booking_form": "Rezervāciju forma",
    "f.online_orders": "Online pasūtījumi",
    "f.ecommerce": "E-commerce funkcionalitāte",
    "f.payments": "Maksājumi (Stripe/Paysera)",
    "f.admin_panel": "Admin panelis",
    "f.logo_design": "Logo dizains",
    "f.texts": "Tekstu rakstīšana",
    "f.images": "Bildes / fotogrāfijas",

    // Materials
    "mat.logo": "Logo dizains",
    "mat.texts": "Tekstu rakstīšana",
    "mat.images": "Attēli / fotogrāfijas",
    "mat.all": "Viss no nulles (logo + teksti + bildes)",

    // Assets
    "asset.design": "Ir dizains / mockup",
    "asset.logo": "Ir logo",
    "asset.texts": "Ir teksti gatavi",
    "asset.images": "Ir bildes / foto",

    // Design levels
    "design.simple.label": "Vienkāršs",
    "design.simple.description": "Template-based, ātri",
    "design.modern.label": "Moderns",
    "design.modern.description": "Pielāgots dizains",
    "design.premium.label": "Premium",
    "design.premium.description": "Unikāls, ar animācijām",
    "design.custom.label": "Custom UI/UX",
    "design.custom.description": "No nulles, ar prototipēšanu",

    // Urgency
    "urg.normal": "Normāli (3–4 nedēļas)",
    "urg.fast": "Paātrināti (2 nedēļas)",
    "urg.urgent": "Steidzami (1 nedēļa)",
    "urg.asap": "ASAP (3–5 dienas)",

    // Maintenance
    "maint.none.label": "Nav nepieciešama",
    "maint.none.description": "Es pats uzturēšu",
    "maint.basic.label": "Pamata uzturēšana",
    "maint.basic.description": "Hostings, drošība, backups",
    "maint.regular.label": "Regulāri atjauninājumi",
    "maint.regular.description": "+ saturs, izmaiņas, atskaites",
  },
  en: {
    // Header
    "header.brand": "PriceLab",
    "header.tagline": "Web Calculator",
    "header.reset": "Start over",

    // Hero
    "hero.badge": "Real prices · Latvian market · No hidden fees",
    "hero.titleA": "How much does",
    "hero.titleB": "your website cost",
    "hero.subtitle":
      "Answer a few questions and get an accurate price range in real time. Full summary and quote — no signup required.",
    "hero.cta": "Start estimate",
    "hero.badge1.title": "Real-time calculation",
    "hero.badge1.text": "Price updates with every choice",
    "hero.badge2.title": "No commitment",
    "hero.badge2.text": "Just an indicative quote",
    "hero.badge3.title": "Transparent breakdown",
    "hero.badge3.text": "See what you're paying for",

    // Steps
    "steps.type": "Type",
    "steps.sections": "Sections",
    "steps.features": "Features",
    "steps.materials": "Materials",
    "steps.assets": "Already have",
    "steps.design": "Design",
    "steps.urgency": "Deadline",
    "steps.maintenance": "Maintenance",

    // Step questions
    "step0.title": "What kind of website?",
    "step0.subtitle": "Pick the closest project type.",
    "step1.title": "How many sections will the site have?",
    "step1.subtitle": "A section = a separate page or major block (Home, About, Services, etc.)",
    "step2.title": "Which features do you need?",
    "step2.subtitle": "Tick everything you need. Prices are shown next to each.",
    "step3.title": "What should we create for you?",
    "step3.subtitle": "Tick what you want us to prepare.",
    "step3.note": "💡 If you choose \"Everything from scratch\", individual items will be ignored.",
    "step4.title": "What do you already have ready?",
    "step4.subtitle": "Get a discount for materials you provide.",
    "step5.title": "What design level do you need?",
    "step5.subtitle": "From template to fully unique.",
    "step6.title": "How fast do you need it?",
    "step6.subtitle": "Urgency affects the final price.",
    "step7.title": "Do you need maintenance?",
    "step7.subtitle": "Monthly fee after delivery — not included in the final price.",

    // Feature categories
    "features.essential": "Essential",
    "features.marketing": "Marketing & SEO",
    "features.ecommerce": "E-commerce",
    "features.advanced": "Advanced",

    // Nav
    "nav.back": "Back",
    "nav.next": "Next",
    "nav.step": "Step",

    // Common
    "common.included": "included",
    "common.optional": "(optional)",
    "common.required": "*",
    "common.perMonth": "/mo",

    // Result panel
    "result.placeholder.title": "Start by picking a website type",
    "result.placeholder.text":
      "Pick a project type on the left to see the price calculation in real time.",
    "result.heading": "Your website price",
    "result.marketRange": "Typical market price for this kind of project:",
    "result.savings": "Savings from your materials: ~",
    "result.recommended.title": "Recommended package",
    "result.recommended.badge": "Best choice",
    "result.recommended.text":
      "Premium design, priority support, advanced features — best long-term ROI.",
    "result.cheaper": "How to reduce",
    "result.better": "How to improve",
    "result.breakdown": "Price breakdown",
    "result.admin.title": "Internal (admin)",
    "result.admin.show": "Show",
    "result.admin.hide": "Hide",
    "result.admin.cost": "Cost (30%)",
    "result.admin.profit": "Profit (70%)",
    "result.admin.note":
      "Calculated from the average price. The client doesn't see this.",

    // Lead form
    "lead.empty": "First pick a website type to calculate the price.",
    "lead.title": "Get a precise quote",
    "lead.subtitle":
      "Leave your contact details — we'll prepare an individual quote within 24h.",
    "lead.field.name": "Name",
    "lead.field.contact": "Email or phone",
    "lead.field.company": "Company",
    "lead.field.comments": "Additional comments",
    "lead.placeholder.name": "John Smith",
    "lead.placeholder.contact": "john@example.com",
    "lead.placeholder.company": "Acme Inc.",
    "lead.placeholder.comments":
      "Tell us more about the project, references to websites you like...",
    "lead.estimate": "Estimated price:",
    "lead.submit": "Get a precise quote",
    "lead.disclaimer":
      "Pressing the button opens WhatsApp / email with a full summary.",
    "lead.success.title": "Request prepared!",
    "lead.success.text":
      "Choose how to send — all data and the price are pre-filled.",
    "lead.success.whatsapp": "WhatsApp",
    "lead.success.email": "Email",
    "lead.success.edit": "Edit details",
    "lead.error.name": "Name must be at least 2 characters",
    "lead.error.contact": "Please provide email or phone",
    "lead.error.max": "Max characters reached",

    // Lead summary
    "summary.heading": "👋 New website request",
    "summary.name": "Name",
    "summary.contact": "Contact",
    "summary.company": "Company",
    "summary.project": "📋 PROJECT",
    "summary.type": "Type",
    "summary.sections": "Sections",
    "summary.design": "Design",
    "summary.deadline": "Deadline",
    "summary.features": "⚙️ FEATURES:",
    "summary.assets": "✅ ALREADY HAS:",
    "summary.maintenance": "🔧 Maintenance:",
    "summary.price": "💰 ESTIMATED PRICE",
    "summary.range": "Range",
    "summary.average": "Average",
    "summary.tier": "Tier",
    "summary.comments": "💬 COMMENTS:",
    "summary.subject": "Website request — ",

    // Footer
    "footer.text":
      "Prices based on average rates of small web studios in the Latvian market · Final price confirmed after project brief",

    // Tiers
    "tier.budget.label": "Budget",
    "tier.budget.description":
      "Simple but professional solution for small businesses and startups.",
    "tier.standard.label": "Standard",
    "tier.standard.description":
      "For most businesses — a good balance of price and functionality.",
    "tier.advanced.label": "Advanced",
    "tier.advanced.description":
      "Feature-rich, custom design, high-quality solution.",
    "tier.premium.label": "Premium",
    "tier.premium.description":
      "Complex solutions, custom UI/UX, full functionality.",

    // Website types
    "wt.landing.label": "Landing Page",
    "wt.landing.description": "Single page with a clear CTA — product, event, campaign",
    "wt.business.label": "Business website",
    "wt.business.description": "Classic company card with services and contacts",
    "wt.restaurant.label": "Restaurant / cafe",
    "wt.restaurant.description": "Menu, table reservations, location",
    "wt.portfolio.label": "Portfolio",
    "wt.portfolio.description": "Creative person or studio — works gallery and about me",
    "wt.ecommerce.label": "E-commerce",
    "wt.ecommerce.description": "Full purchase flow — products, cart, payments",
    "wt.booking.label": "Booking system",
    "wt.booking.description": "Appointment/booking system with calendar and payment",
    "wt.custom.label": "Custom solution",
    "wt.custom.description": "Web app, dashboard, SaaS, complex integration",

    // Section tiers
    "sec.1-3": "1–3 sections",
    "sec.4-6": "4–6 sections",
    "sec.7-10": "7–10 sections",
    "sec.10+": "10+ sections",

    // Features
    "f.contact_form": "Contact form",
    "f.whatsapp": "WhatsApp / Telegram",
    "f.google_maps": "Google Maps",
    "f.gallery": "Gallery",
    "f.reviews": "Testimonials",
    "f.google_reviews": "Google Reviews integration",
    "f.animations": "Animations",
    "f.multilang": "Multi-language",
    "f.blog": "Blog",
    "f.seo": "SEO optimization",
    "f.domain_hosting": "Domain / hosting",
    "f.performance": "Performance optimization",
    "f.booking_form": "Booking form",
    "f.online_orders": "Online ordering",
    "f.ecommerce": "E-commerce functionality",
    "f.payments": "Payments (Stripe/Paysera)",
    "f.admin_panel": "Admin panel",
    "f.logo_design": "Logo design",
    "f.texts": "Copywriting",
    "f.images": "Photos / imagery",

    // Materials
    "mat.logo": "Logo design",
    "mat.texts": "Copywriting",
    "mat.images": "Photos / imagery",
    "mat.all": "Everything from scratch (logo + copy + photos)",

    // Assets
    "asset.design": "Have design / mockup",
    "asset.logo": "Have logo",
    "asset.texts": "Copy is ready",
    "asset.images": "Have photos",

    // Design levels
    "design.simple.label": "Simple",
    "design.simple.description": "Template-based, fast",
    "design.modern.label": "Modern",
    "design.modern.description": "Customized design",
    "design.premium.label": "Premium",
    "design.premium.description": "Unique, with animations",
    "design.custom.label": "Custom UI/UX",
    "design.custom.description": "From scratch, with prototyping",

    // Urgency
    "urg.normal": "Normal (3–4 weeks)",
    "urg.fast": "Accelerated (2 weeks)",
    "urg.urgent": "Urgent (1 week)",
    "urg.asap": "ASAP (3–5 days)",

    // Maintenance
    "maint.none.label": "Not needed",
    "maint.none.description": "I'll maintain it myself",
    "maint.basic.label": "Basic maintenance",
    "maint.basic.description": "Hosting, security, backups",
    "maint.regular.label": "Regular updates",
    "maint.regular.description": "+ content, changes, reports",
  },
} as const;

export type TranslationKey = keyof (typeof translations)["lv"];
