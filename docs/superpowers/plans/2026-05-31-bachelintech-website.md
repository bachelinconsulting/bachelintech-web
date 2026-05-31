# Bachelin Tech — Site Vitrine Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete 5-page bilingual (FR/EN) website for bachelintech.com using vanilla HTML/CSS/JS, deployable on GitHub Pages.

**Architecture:** Vanilla multi-page site — 5 HTML files sharing one CSS (design system) and two JS files (i18n + interactions). No build step, no dependencies. Translations via `data-i18n` attributes read by i18n.js at runtime.

**Tech Stack:** HTML5, CSS3 (custom properties), Vanilla JS (ES6+), Google Fonts (Cormorant Garamond + Inter), GitHub Pages.

---

## File Map

| File | Responsibility |
|---|---|
| `assets/css/main.css` | Complete design system: variables, typography, nav, footer, components, pages, responsive |
| `assets/js/i18n.js` | All FR/EN translations + lang toggle/init logic |
| `assets/js/main.js` | Nav active state, mobile burger, contact form |
| `assets/images/logo-btech.png` | Already in place |
| `index.html` | Accueil — hero split, manifeste, services aperçu, CTA |
| `projets.html` | Projets — YoCombi!, M.I.A, 5 projets clients |
| `services.html` | Services — 6 expertises, processus 4 étapes |
| `a-propos.html` | À propos — histoire, valeurs, équipe, localisation |
| `contact.html` | Contact — formulaire, coordonnées |
| `CNAME` | GitHub Pages custom domain: bachelintech.com |
| `.gitignore` | DS_Store, .superpowers/, etc. |

---

### Task 1: Project setup + Design system CSS

**Files:**
- Create: `assets/css/main.css`
- Create: `.gitignore`

- [ ] **Step 1: Create folder structure**

```bash
mkdir -p assets/css assets/js
# assets/images/ already exists with logo-btech.png
```

- [ ] **Step 2: Create `.gitignore`**

```
.DS_Store
.superpowers/
*.backup
*.bak
node_modules/
```

- [ ] **Step 3: Create `assets/css/main.css` — variables, reset, typography**

```css
/* ─── GOOGLE FONTS ───────────────────────────────── */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap');

/* ─── VARIABLES ──────────────────────────────────── */
:root {
  --cream:      #F5F0EB;
  --brown:      #3D1A0A;
  --dark:       #1a0a04;
  --footer-bg:  #140805;
  --white:      #ffffff;
  --border:     rgba(61, 26, 10, 0.10);
  --muted:      rgba(61, 26, 10, 0.50);
  --font-serif: 'Cormorant Garamond', Georgia, serif;
  --font-sans:  'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* ─── RESET ──────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { background: var(--cream); color: var(--dark); font-family: var(--font-serif); -webkit-font-smoothing: antialiased; }
img { max-width: 100%; display: block; }
a { text-decoration: none; color: inherit; }
ul { list-style: none; }
button { cursor: pointer; border: none; background: none; font-family: inherit; }

/* ─── TYPOGRAPHY ─────────────────────────────────── */
h1, h2, h3, h4 { font-family: var(--font-serif); font-weight: 300; line-height: 1.15; color: var(--dark); }
p { font-family: var(--font-sans); font-weight: 300; line-height: 1.75; color: var(--muted); }
.eyebrow { font-family: var(--font-sans); font-size: 10px; letter-spacing: 3px; font-weight: 500; color: var(--muted); text-transform: uppercase; }
.brown  { color: var(--brown); }
.rule   { width: 40px; height: 1px; background: var(--brown); }

/* ─── NAV ────────────────────────────────────────── */
#main-nav {
  position: sticky; top: 0; z-index: 100;
  background: var(--cream);
  height: 72px;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 52px;
  border-bottom: 1px solid var(--border);
}
.nav-logo { height: 44px; width: auto; }
.nav-links { display: flex; gap: 32px; align-items: center; }
.nav-links a {
  font-family: var(--font-sans); font-size: 11px; letter-spacing: 1.8px;
  text-transform: uppercase; color: var(--brown); opacity: 0.7; transition: opacity 0.2s;
}
.nav-links a:hover, .nav-links a.active { opacity: 1; }
.nav-links a.active { border-bottom: 1px solid var(--brown); padding-bottom: 2px; }
.nav-right { display: flex; align-items: center; gap: 16px; }
.lang-toggle {
  font-family: var(--font-sans); font-size: 10px; letter-spacing: 2px;
  color: var(--brown); border-bottom: 1px solid rgba(61,26,10,0.4); padding-bottom: 2px;
}
.nav-burger { display: none; font-size: 22px; color: var(--brown); }
.nav-mobile {
  display: none; position: fixed; inset: 0; background: var(--cream); z-index: 99;
  flex-direction: column; align-items: center; justify-content: center; gap: 32px;
}
.nav-mobile.open { display: flex; }
.nav-mobile a { font-family: var(--font-serif); font-size: 32px; font-weight: 300; color: var(--dark); }
.nav-mobile-close { position: absolute; top: 24px; right: 28px; font-size: 28px; color: var(--brown); }

/* ─── FOOTER ─────────────────────────────────────── */
#main-footer {
  background: var(--footer-bg);
  padding: 32px 52px;
  display: flex; justify-content: space-between; align-items: center;
}
.footer-logo { height: 52px; width: auto; opacity: 0.4; filter: brightness(10); }
.footer-copy { font-family: var(--font-sans); font-size: 11px; color: rgba(245,240,235,0.28); }

/* ─── BUTTONS ────────────────────────────────────── */
.btn-primary {
  display: inline-block; font-family: var(--font-sans); font-size: 10px;
  letter-spacing: 2.5px; font-weight: 600; text-transform: uppercase;
  background: var(--brown); color: var(--cream); padding: 13px 26px; transition: opacity 0.2s;
}
.btn-primary:hover { opacity: 0.85; }
.btn-ghost {
  font-family: var(--font-serif); font-size: 15px; font-style: italic;
  color: var(--brown); border-bottom: 1px solid rgba(61,26,10,0.3); padding-bottom: 2px;
}
.btn-light {
  display: inline-block; font-family: var(--font-sans); font-size: 10px;
  letter-spacing: 2.5px; font-weight: 600; text-transform: uppercase;
  background: var(--cream); color: var(--brown); padding: 14px 30px;
}
.btn-light:hover { opacity: 0.85; }

/* ─── PAGE HERO (inner pages) ────────────────────── */
.page-hero { padding: 72px 52px 56px; border-bottom: 1px solid var(--border); }
.page-hero h1 { font-size: 48px; margin-top: 12px; }

/* ─── CTA BAND ───────────────────────────────────── */
.cta-band {
  background: var(--brown); padding: 72px 52px;
  display: flex; justify-content: space-between; align-items: center; gap: 40px;
}
.cta-band h2 { font-size: 36px; color: var(--cream); }
.cta-band p  { color: rgba(245,240,235,0.5); margin-top: 8px; }

/* ─── SECTION HELPERS ────────────────────────────── */
.section { padding: 64px 52px; }
.section-top {
  display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 48px;
}

/* ─── HOME: HERO SPLIT ───────────────────────────── */
.hero-split {
  display: grid; grid-template-columns: 52% 48%;
  min-height: 500px; border-bottom: 1px solid var(--border);
}
.hero-left {
  padding: 60px 52px;
  display: flex; flex-direction: column; justify-content: space-between;
  border-right: 1px solid var(--border);
}
.hero-logo    { height: 72px; width: auto; margin-bottom: 24px; }
.hero-headline { font-size: 54px; line-height: 1.1; }
.hero-meta    { margin-top: auto; padding-top: 36px; }
.hero-tagline {
  font-family: var(--font-sans); font-size: 13px; font-weight: 300; color: #5a3a28;
  line-height: 1.75; max-width: 340px; margin-bottom: 28px;
}
.hero-ctas    { display: flex; align-items: center; gap: 20px; }
.hero-right   { display: flex; flex-direction: column; }
.hero-product {
  flex: 1; padding: 36px 40px; border-bottom: 1px solid var(--border);
  display: flex; flex-direction: column; justify-content: space-between;
  transition: background 0.2s;
}
.hero-product:last-child { border-bottom: none; }
.hero-product:hover { background: rgba(255,255,255,0.5); }
.prod-name { font-size: 36px; margin: 10px 0; }
.prod-link { font-family: var(--font-serif); font-size: 15px; font-style: italic; color: rgba(61,26,10,0.35); margin-top: 14px; }

/* ─── HOME: MANIFESTE ────────────────────────────── */
.manifeste {
  padding: 72px 52px; display: grid; grid-template-columns: 1fr 1fr;
  gap: 64px; align-items: center; border-bottom: 1px solid var(--border); background: var(--white);
}
.manifeste blockquote { font-size: 30px; line-height: 1.4; }
.manifeste .rule      { margin-bottom: 22px; }

/* ─── HOME: SERVICES APERÇU ──────────────────────── */
.services-preview { padding: 64px 52px; border-bottom: 1px solid var(--border); }
.services-grid    { display: grid; grid-template-columns: repeat(3, 1fr); }
.svc-item { padding: 24px; border-left: 1px solid var(--border); }
.svc-item:first-child { border-left: none; padding-left: 0; }
.svc-num  { font-family: var(--font-sans); font-size: 10px; letter-spacing: 2px; color: rgba(61,26,10,0.28); margin-bottom: 12px; }
.svc-name { font-size: 20px; margin-bottom: 8px; }
.svc-desc { font-size: 12px; }

/* ─── PROJECTS ───────────────────────────────────── */
.product-feature {
  padding: 64px 52px; display: grid; grid-template-columns: 1fr 1fr;
  gap: 64px; align-items: start; border-bottom: 1px solid var(--border);
}
.product-feature:nth-child(even) { background: var(--white); }
.product-tag {
  display: inline-block; font-family: var(--font-sans); font-size: 9px; letter-spacing: 2px;
  font-weight: 700; color: var(--brown); background: rgba(61,26,10,0.07);
  padding: 4px 12px; border-radius: 20px; margin-bottom: 16px;
}
.product-name         { font-size: 48px; line-height: 1; margin-bottom: 16px; }
.product-name .accent { color: var(--brown); }
.product-body p       { margin-top: 16px; font-size: 13px; }
.product-meta         { margin-top: 24px; }
.product-meta-item {
  display: flex; gap: 12px; padding: 12px 0;
  border-top: 1px solid var(--border); font-family: var(--font-sans); font-size: 12px;
}
.product-meta-label { color: var(--muted); min-width: 100px; }
.product-meta-value { color: var(--dark); font-weight: 500; }
.product-visual {
  background: var(--cream); border: 1px solid var(--border); padding: 40px;
  display: flex; align-items: center; justify-content: center; min-height: 280px;
}
.product-visual-placeholder { font-size: 64px; color: rgba(61,26,10,0.12); font-family: var(--font-serif); }

/* Client grid */
.clients-section { padding: 64px 52px; background: var(--white); }
.clients-grid {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 1px; background: var(--border); border: 1px solid var(--border); margin-top: 40px;
}
.client-card { background: var(--cream); padding: 32px 28px; transition: background 0.2s; }
.client-card:hover { background: var(--white); }
.client-sector { font-family: var(--font-sans); font-size: 9px; letter-spacing: 2px; color: var(--muted); font-weight: 600; margin-bottom: 10px; }
.client-name   { font-size: 22px; margin-bottom: 10px; }
.client-desc   { font-size: 12px; line-height: 1.65; }

/* ─── SERVICES ───────────────────────────────────── */
.services-full { padding: 64px 52px; border-bottom: 1px solid var(--border); }
.services-full-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0; margin-top: 40px; }
.service-full-item { padding: 36px 32px; border-top: 1px solid var(--border); border-left: 1px solid var(--border); }
.service-full-item:nth-child(odd) { border-left: none; }
.service-icon  { font-size: 28px; margin-bottom: 16px; }
.service-title { font-size: 24px; margin-bottom: 12px; }
.service-text  { font-size: 13px; }

.process-section { padding: 64px 52px; background: var(--white); border-bottom: 1px solid var(--border); }
.process-steps   { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; margin-top: 40px; }
.process-step    { padding: 32px 24px; border-left: 1px solid var(--border); }
.process-step:first-child { border-left: none; }
.process-num   { font-family: var(--font-sans); font-size: 10px; letter-spacing: 2px; color: var(--muted); margin-bottom: 12px; }
.process-title { font-size: 20px; margin-bottom: 8px; }
.process-desc  { font-size: 12px; }

/* ─── ABOUT ──────────────────────────────────────── */
.about-histoire {
  padding: 72px 52px; display: grid; grid-template-columns: 40% 1fr;
  gap: 72px; border-bottom: 1px solid var(--border);
}
.about-histoire h2 { font-size: 36px; }
.about-histoire p  { font-size: 13px; margin-top: 16px; }

.values-section { padding: 64px 52px; border-bottom: 1px solid var(--border); background: var(--white); }
.values-grid    { display: grid; grid-template-columns: repeat(3,1fr); gap: 32px; margin-top: 40px; }
.value-card     { padding: 32px 0; border-top: 2px solid var(--brown); }
.value-name     { font-size: 22px; margin: 12px 0 10px; }
.value-desc     { font-size: 12px; }

.team-section { padding: 64px 52px; border-bottom: 1px solid var(--border); }
.team-grid    { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; margin-top: 32px; }
.team-placeholder { border: 1px solid var(--border); padding: 28px; background: var(--white); }
.team-avatar  { width: 64px; height: 64px; border-radius: 50%; background: var(--cream); border: 1px solid var(--border); margin-bottom: 16px; }

/* ─── CONTACT ────────────────────────────────────── */
.contact-layout {
  padding: 64px 52px; display: grid; grid-template-columns: 1fr 1fr;
  gap: 80px; align-items: start;
}
.contact-form   { display: flex; flex-direction: column; gap: 20px; }
.form-group     { display: flex; flex-direction: column; gap: 6px; }
.form-label     { font-family: var(--font-sans); font-size: 10px; letter-spacing: 2px; color: var(--muted); font-weight: 500; text-transform: uppercase; }
.form-input, .form-textarea {
  background: var(--white); border: 1px solid var(--border); padding: 14px 16px;
  font-family: var(--font-sans); font-size: 13px; color: var(--dark);
  outline: none; transition: border-color 0.2s; width: 100%;
}
.form-input:focus, .form-textarea:focus { border-color: var(--brown); }
.form-textarea { resize: vertical; min-height: 140px; }
.form-submit   { align-self: flex-start; margin-top: 8px; }
#form-success  { display: none; font-family: var(--font-serif); font-size: 18px; font-style: italic; color: var(--brown); padding: 20px 0; }

.contact-info h3 { font-size: 24px; margin-bottom: 24px; }
.contact-info-item { display: flex; flex-direction: column; gap: 4px; padding: 16px 0; border-top: 1px solid var(--border); }
.info-label { font-family: var(--font-sans); font-size: 10px; letter-spacing: 2px; color: var(--muted); }
.info-value { font-size: 16px; }

/* ─── RESPONSIVE ─────────────────────────────────── */
@media (max-width: 768px) {
  #main-nav { padding: 0 20px; }
  .nav-links { display: none; }
  .nav-burger { display: block; }

  .hero-split { grid-template-columns: 1fr; }
  .hero-left  { padding: 40px 20px; border-right: none; border-bottom: 1px solid var(--border); }
  .hero-headline { font-size: 38px; }

  .manifeste,
  .product-feature,
  .about-histoire,
  .contact-layout { grid-template-columns: 1fr; gap: 40px; padding: 48px 20px; }

  .services-grid,
  .process-steps { grid-template-columns: 1fr; }
  .svc-item, .process-step { border-left: none; border-top: 1px solid var(--border); padding: 20px 0; }
  .svc-item:first-child, .process-step:first-child { border-top: none; }

  .services-full-grid, .clients-grid, .values-grid, .team-grid { grid-template-columns: 1fr; }
  .service-full-item { border-left: none; }

  .services-preview, .services-full, .process-section, .clients-section,
  .values-section, .team-section, .section { padding: 48px 20px; }

  .page-hero { padding: 48px 20px 40px; }
  .page-hero h1 { font-size: 34px; }

  .cta-band { flex-direction: column; align-items: flex-start; padding: 48px 20px; }
  .cta-band h2 { font-size: 28px; }

  #main-footer { flex-direction: column; gap: 16px; padding: 24px 20px; text-align: center; }
}
```

- [ ] **Step 4: Open any HTML file in browser, DevTools console:**

```js
getComputedStyle(document.documentElement).getPropertyValue('--brown').trim()
// Expected: "#3D1A0A"
```

- [ ] **Step 5: Commit**

```bash
git add assets/css/main.css .gitignore
git commit -m "feat: add design system CSS — variables, layout, all components, responsive"
```

---

### Task 2: i18n bilingual system

**Files:**
- Create: `assets/js/i18n.js`

- [ ] **Step 1: Create `assets/js/i18n.js`**

```js
const translations = {
  fr: {
    'meta.title.home':     "Bachelin Tech — La vision d'un monde meilleur",
    'meta.title.projects': 'Nos Projets — Bachelin Tech',
    'meta.title.services': 'Nos Services — Bachelin Tech',
    'meta.title.about':    'À propos — Bachelin Tech',
    'meta.title.contact':  'Contact — Bachelin Tech',
    'nav.home': 'Accueil', 'nav.projects': 'Projets', 'nav.services': 'Services',
    'nav.about': 'À propos', 'nav.contact': 'Contact',
    'home.eyebrow': 'Yaoundé · Cameroun',
    'home.headline1': 'La vision', 'home.headline2': "d'un monde", 'home.headline3': 'meilleur',
    'home.tagline': "Bachelin Tech conçoit des solutions numériques audacieuses pour l'Afrique — des plateformes qui résolvent de vrais problèmes, pour de vraies personnes.",
    'home.cta.projects': 'Nos projets', 'home.cta.contact': 'Nous écrire',
    'home.prod1.eyebrow': 'Marketplace · Cameroun',
    'home.prod1.desc': 'Connecter travailleurs et clients en 12 villes. Mobile Money, SMS, accessible à tous.',
    'home.prod2.eyebrow': 'IA · Immobilier',
    'home.prod2.desc': "L'intelligence artificielle au service de l'immobilier africain.",
    'home.manifeste.quote': "Nous construisons pour l'Afrique d'aujourd'hui et de demain.",
    'home.manifeste.p1': "Bachelin Tech naît d'une conviction simple : les solutions numériques qui changent des vies se construisent depuis le terrain, pas depuis une salle de réunion à l'autre bout du monde.",
    'home.manifeste.p2': "Chaque produit que nous créons — pour nous-mêmes ou pour nos clients — part d'un problème réel, d'une contrainte locale, d'une opportunité que nous avons vue de nos propres yeux.",
    'home.services.eyebrow': 'Ce que nous faisons', 'home.services.title': 'Nos expertises',
    'home.services.seeall': 'Voir tous les services',
    'home.svc1.name': 'Applications mobiles', 'home.svc1.desc': 'iOS et Android pensées pour les marchés africains et leurs contraintes.',
    'home.svc2.name': 'Plateformes web & API', 'home.svc2.desc': 'De la landing page au back-office, nous couvrons tout le spectre.',
    'home.svc3.name': 'Intelligence artificielle', 'home.svc3.desc': 'Intégration IA, automatisation, produits data-driven.',
    'cta.headline1': 'Un projet en tête ?', 'cta.headline2': 'Parlons-en.',
    'cta.sub': 'Nous transformons vos idées en solutions qui comptent.', 'cta.btn': 'Nous contacter',
    'footer.copy': '© 2025 Bachelin Tech · Yaoundé, Cameroun',
    'projects.eyebrow': 'Nos réalisations', 'projects.title': 'Ce que nous avons construit',
    'projects.sub': 'Deux produits propres, et des solutions sur-mesure pour nos clients.',
    'projects.prod1.tag': 'Marketplace',
    'projects.prod1.meta.tech': 'React Native · Node.js · Supabase',
    'projects.prod1.meta.cities': '12 villes au Cameroun',
    'projects.prod1.meta.payment': 'Mobile Money (MTN / Orange)',
    'projects.prod1.desc1': "YoCombi! est la plateforme qui connecte les travailleurs du secteur informel avec les demandeurs de services au Cameroun.",
    'projects.prod1.desc2': "Conçue pour fonctionner sur de faibles connexions et accessible même par SMS, elle couvre 12 villes et intègre les paiements Mobile Money MTN et Orange.",
    'projects.prod2.tag': 'Intelligence Artificielle · Immobilier',
    'projects.prod2.meta.tech': 'React · Node.js · OpenAI API',
    'projects.prod2.meta.market': 'Marché immobilier africain',
    'projects.prod2.meta.features': 'Estimation · Recherche · Conseil IA',
    'projects.prod2.desc1': "My Immo AI est une plateforme intelligente qui révolutionne la recherche et l'estimation immobilière en Afrique.",
    'projects.prod2.desc2': "Grâce à l'IA, les utilisateurs obtiennent des estimations précises, des recommandations personnalisées et un accompagnement tout au long de leur projet immobilier.",
    'projects.clients.eyebrow': 'Réalisations clients', 'projects.clients.title': 'Ils nous ont fait confiance',
    'services.eyebrow': 'Nos expertises', 'services.title': 'Ce que nous faisons',
    'services.sub': 'Du concept au déploiement, nous accompagnons chaque étape de votre projet digital.',
    'services.s1.title': 'Applications mobiles',
    'services.s1.desc': "Développement iOS et Android natif ou cross-platform (React Native / Expo). Interfaces pensées pour les marchés africains : faible connectivité, Mobile Money, SMS fallback.",
    'services.s2.title': 'Plateformes web & API',
    'services.s2.desc': "Sites vitrines, applications web complexes, APIs REST et GraphQL. Architecture scalable, performances optimisées, déploiement cloud ou on-premise.",
    'services.s3.title': 'Intelligence artificielle',
    'services.s3.desc': "Intégration de modèles LLM, automatisation de processus, recommandation, NLP. Nous construisons des produits IA pragmatiques qui créent une valeur réelle.",
    'services.s4.title': 'UI/UX Design',
    'services.s4.desc': "Conception d'interfaces centrées utilisateur. Recherche UX, prototypage, design system. Des produits beaux et fonctionnels, du premier écran au dernier.",
    'services.s5.title': 'Conseil digital',
    'services.s5.desc': "Audit de vos outils existants, définition de roadmap produit, choix technologiques. Nous vous aidons à prendre les bonnes décisions stratégiques.",
    'services.s6.title': 'Déploiement & maintenance',
    'services.s6.desc': "CI/CD, monitoring, mises à jour, support technique. Nous livrons et nous restons — vos solutions évoluent avec votre activité.",
    'services.process.eyebrow': 'Comment nous travaillons', 'services.process.title': 'Notre processus',
    'services.p1.title': 'Comprendre', 'services.p1.desc': "Immersion dans votre contexte, vos utilisateurs, vos contraintes. Pas de solution sans compréhension profonde du problème.",
    'services.p2.title': 'Concevoir', 'services.p2.desc': "Prototypage rapide, itérations, validation avec les parties prenantes. Le design avant le code.",
    'services.p3.title': 'Construire', 'services.p3.desc': "Développement en sprints, code de qualité, tests. Vous voyez avancer le projet à chaque étape.",
    'services.p4.title': 'Livrer', 'services.p4.desc': "Déploiement, formation si nécessaire, documentation. Et on reste disponibles après.",
    'about.eyebrow': 'Qui sommes-nous', 'about.title': 'À propos de Bachelin Tech',
    'about.sub': '"La vision d\'un monde meilleur"',
    'about.h.eyebrow': 'Notre histoire', 'about.h.title': "Nés du terrain, construits pour l'Afrique",
    'about.h.p1': "Bachelin Tech est une société de développement de solutions numériques basée à Yaoundé, au Cameroun. Nous sommes nés d'une conviction : les meilleurs produits numériques pour l'Afrique doivent être conçus par des Africains, qui comprennent les contraintes et les opportunités du terrain.",
    'about.h.p2': "Depuis notre fondation, nous avons développé deux produits propres — YoCombi! et M.I.A — et accompagné plusieurs entreprises dans leur transformation digitale, toujours avec la même exigence : des solutions qui marchent vraiment, pour de vraies personnes.",
    'about.v.eyebrow': 'Ce en quoi nous croyons', 'about.v.title': 'Nos valeurs',
    'about.v1.name': 'Ancrage local', 'about.v1.desc': "Nous construisons depuis Yaoundé, pour l'Afrique. Chaque décision produit tient compte des réalités du terrain — connectivité, modes de paiement, usages locaux.",
    'about.v2.name': 'Excellence', 'about.v2.desc': "Nous refusons le médiocre. Chaque ligne de code, chaque interface, chaque interaction doit atteindre le niveau de qualité que méritent nos utilisateurs.",
    'about.v3.name': 'Impact réel', 'about.v3.desc': "Nous ne construisons pas pour construire. Chaque produit doit résoudre un vrai problème, créer une vraie valeur, changer quelque chose de concret dans la vie des gens.",
    'about.team.eyebrow': "L'équipe", 'about.team.title': 'Les bâtisseurs',
    'about.team.note': 'Page équipe à compléter avec les profils réels.',
    'about.location.eyebrow': 'Où nous sommes', 'about.location.title': 'Yaoundé, Cameroun',
    'about.location.desc': "Basés au cœur de la capitale politique du Cameroun, nous opérons à l'échelle nationale et régionale.",
    'contact.eyebrow': 'Travaillons ensemble', 'contact.title': 'Parlons-en',
    'contact.sub': 'Un projet, une idée, une question — nous sommes à l\'écoute.',
    'contact.form.name': 'Votre nom', 'contact.form.email': 'Votre email',
    'contact.form.subject': 'Sujet', 'contact.form.message': 'Votre message',
    'contact.form.send': 'Envoyer',
    'contact.form.success': 'Message reçu — nous vous répondons sous 48h.',
    'contact.info.title': 'Coordonnées',
    'contact.info.email.label': 'Email', 'contact.info.email.value': 'contact@bachelintech.com',
    'contact.info.location.label': 'Adresse', 'contact.info.location.value': 'Yaoundé, Cameroun',
    'contact.info.hours.label': 'Disponibilité', 'contact.info.hours.value': 'Lun – Ven, 8h – 18h (WAT)',
  },
  en: {
    'meta.title.home':     'Bachelin Tech — The vision of a better world',
    'meta.title.projects': 'Our Projects — Bachelin Tech',
    'meta.title.services': 'Our Services — Bachelin Tech',
    'meta.title.about':    'About — Bachelin Tech',
    'meta.title.contact':  'Contact — Bachelin Tech',
    'nav.home': 'Home', 'nav.projects': 'Projects', 'nav.services': 'Services',
    'nav.about': 'About', 'nav.contact': 'Contact',
    'home.eyebrow': 'Yaoundé · Cameroon',
    'home.headline1': 'The vision', 'home.headline2': 'of a better', 'home.headline3': 'world',
    'home.tagline': 'Bachelin Tech builds bold digital solutions for Africa — platforms that solve real problems, for real people.',
    'home.cta.projects': 'Our projects', 'home.cta.contact': 'Get in touch',
    'home.prod1.eyebrow': 'Marketplace · Cameroon',
    'home.prod1.desc': 'Connecting workers and clients across 12 cities. Mobile Money, SMS, accessible to all.',
    'home.prod2.eyebrow': 'AI · Real Estate',
    'home.prod2.desc': 'Artificial intelligence powering African real estate. Valuation, search, and advice.',
    'home.manifeste.quote': 'We build for the Africa of today and tomorrow.',
    'home.manifeste.p1': "Bachelin Tech was born from a simple conviction: digital solutions that change lives are built from the ground, not from a boardroom on the other side of the world.",
    'home.manifeste.p2': "Every product we create — for ourselves or for our clients — starts from a real problem, a local constraint, an opportunity we witnessed firsthand.",
    'home.services.eyebrow': 'What we do', 'home.services.title': 'Our expertise',
    'home.services.seeall': 'View all services',
    'home.svc1.name': 'Mobile apps', 'home.svc1.desc': 'iOS and Android built for African markets and their constraints.',
    'home.svc2.name': 'Web platforms & APIs', 'home.svc2.desc': 'From landing pages to full back-office, we cover the full stack.',
    'home.svc3.name': 'Artificial intelligence', 'home.svc3.desc': 'LLM integration, automation, data-driven products.',
    'cta.headline1': 'Have a project in mind?', 'cta.headline2': "Let's talk.",
    'cta.sub': 'We turn your ideas into solutions that matter.', 'cta.btn': 'Contact us',
    'footer.copy': '© 2025 Bachelin Tech · Yaoundé, Cameroon',
    'projects.eyebrow': 'Our work', 'projects.title': "What we've built",
    'projects.sub': 'Two in-house products, and custom solutions for our clients.',
    'projects.prod1.tag': 'Marketplace',
    'projects.prod1.meta.tech': 'React Native · Node.js · Supabase',
    'projects.prod1.meta.cities': '12 cities in Cameroon',
    'projects.prod1.meta.payment': 'Mobile Money (MTN / Orange)',
    'projects.prod1.desc1': 'YoCombi! is the platform connecting informal sector workers with service seekers across Cameroon.',
    'projects.prod1.desc2': 'Designed to work on low connectivity and accessible even via SMS, it covers 12 cities and integrates MTN and Orange Mobile Money payments.',
    'projects.prod2.tag': 'Artificial Intelligence · Real Estate',
    'projects.prod2.meta.tech': 'React · Node.js · OpenAI API',
    'projects.prod2.meta.market': 'African real estate market',
    'projects.prod2.meta.features': 'Valuation · Search · AI Advice',
    'projects.prod2.desc1': 'My Immo AI is an intelligent platform revolutionizing property search and valuation in Africa.',
    'projects.prod2.desc2': 'Powered by AI, users get accurate valuations, personalized recommendations and end-to-end guidance for their real estate projects.',
    'projects.clients.eyebrow': 'Client work', 'projects.clients.title': 'They trusted us',
    'services.eyebrow': 'Our expertise', 'services.title': 'What we do',
    'services.sub': 'From concept to deployment, we guide every step of your digital project.',
    'services.s1.title': 'Mobile applications',
    'services.s1.desc': 'Native or cross-platform iOS and Android (React Native / Expo). Designed for African markets: low connectivity, Mobile Money, SMS fallback.',
    'services.s2.title': 'Web platforms & APIs',
    'services.s2.desc': 'Landing pages, complex web apps, REST and GraphQL APIs. Scalable architecture, optimized performance, cloud or on-premise.',
    'services.s3.title': 'Artificial intelligence',
    'services.s3.desc': 'LLM integration, process automation, recommendation engines, NLP. Pragmatic AI products that create real value.',
    'services.s4.title': 'UI/UX Design',
    'services.s4.desc': 'User-centered interface design. UX research, prototyping, design systems. Beautiful and functional products.',
    'services.s5.title': 'Digital consulting',
    'services.s5.desc': 'Audit of your existing tools, product roadmap, technology choices. Strategic decisions for your digital transformation.',
    'services.s6.title': 'Deployment & maintenance',
    'services.s6.desc': "CI/CD, monitoring, updates, technical support. We deliver and we stay — your solutions evolve with your business.",
    'services.process.eyebrow': 'How we work', 'services.process.title': 'Our process',
    'services.p1.title': 'Understand', 'services.p1.desc': 'Deep dive into your context, users, constraints. No solution without a deep understanding of the problem.',
    'services.p2.title': 'Design', 'services.p2.desc': 'Rapid prototyping, iterations, validation with stakeholders. Design before code.',
    'services.p3.title': 'Build', 'services.p3.desc': 'Sprint-based development, quality code, testing. You see the project progress at every step.',
    'services.p4.title': 'Deliver', 'services.p4.desc': 'Deployment, training if needed, documentation. And we stay available after.',
    'about.eyebrow': 'Who we are', 'about.title': 'About Bachelin Tech',
    'about.sub': '"The vision of a better world"',
    'about.h.eyebrow': 'Our story', 'about.h.title': 'Born from the field, built for Africa',
    'about.h.p1': "Bachelin Tech is a digital solutions development company based in Yaoundé, Cameroon. We were born from a conviction: the best digital products for Africa must be designed by Africans who understand the constraints and opportunities on the ground.",
    'about.h.p2': "Since our founding, we have developed two in-house products — YoCombi! and M.I.A — and supported several companies in their digital transformation.",
    'about.v.eyebrow': 'What we believe', 'about.v.title': 'Our values',
    'about.v1.name': 'Local roots', 'about.v1.desc': "We build from Yaoundé, for Africa. Every product decision accounts for ground realities — connectivity, payment methods, local usage patterns.",
    'about.v2.name': 'Excellence', 'about.v2.desc': "We refuse mediocrity. Every line of code, every interface, every interaction must reach the quality level our users deserve.",
    'about.v3.name': 'Real impact', 'about.v3.desc': "We don't build for the sake of building. Every product must solve a real problem and create real value.",
    'about.team.eyebrow': 'The team', 'about.team.title': 'The builders',
    'about.team.note': 'Team page to be completed with real profiles.',
    'about.location.eyebrow': 'Where we are', 'about.location.title': 'Yaoundé, Cameroon',
    'about.location.desc': "Based in the heart of Cameroon's political capital, we operate nationally and regionally.",
    'contact.eyebrow': "Let's work together", 'contact.title': "Let's talk",
    'contact.sub': 'A project, an idea, a question — we\'re listening.',
    'contact.form.name': 'Your name', 'contact.form.email': 'Your email',
    'contact.form.subject': 'Subject', 'contact.form.message': 'Your message',
    'contact.form.send': 'Send',
    'contact.form.success': "Message received — we'll reply within 48h.",
    'contact.info.title': 'Contact details',
    'contact.info.email.label': 'Email', 'contact.info.email.value': 'contact@bachelintech.com',
    'contact.info.location.label': 'Address', 'contact.info.location.value': 'Yaoundé, Cameroon',
    'contact.info.hours.label': 'Availability', 'contact.info.hours.value': 'Mon – Fri, 8am – 6pm (WAT)',
  }
};

function applyTranslations(lang) {
  const t = translations[lang];
  if (!t) return;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const v = t[el.dataset.i18n];
    if (v !== undefined) el.textContent = v;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const v = t[el.dataset.i18nPlaceholder];
    if (v !== undefined) el.placeholder = v;
  });
  document.documentElement.lang = lang;
}

function setLang(lang) {
  localStorage.setItem('btlang', lang);
  applyTranslations(lang);
  const btn = document.getElementById('lang-toggle');
  if (btn) btn.textContent = lang === 'fr' ? 'EN' : 'FR';
}

function initLang() {
  const saved = localStorage.getItem('btlang') || 'fr';
  applyTranslations(saved);
  const btn = document.getElementById('lang-toggle');
  if (btn) {
    btn.textContent = saved === 'fr' ? 'EN' : 'FR';
    btn.addEventListener('click', () => setLang(localStorage.getItem('btlang') === 'fr' ? 'en' : 'fr'));
  }
}

window.addEventListener('DOMContentLoaded', initLang);
window.setLang = setLang;
```

- [ ] **Step 2: Verify in browser console**

```js
setLang('en');  // → All [data-i18n] switch to English
setLang('fr');  // → Revert to French
localStorage.getItem('btlang'); // → "fr"
```

- [ ] **Step 3: Commit**

```bash
git add assets/js/i18n.js
git commit -m "feat: add bilingual FR/EN i18n system with localStorage persistence"
```

---

### Task 3: main.js

**Files:**
- Create: `assets/js/main.js`

- [ ] **Step 1: Create `assets/js/main.js`**

```js
document.addEventListener('DOMContentLoaded', () => {

  /* ── NAV ACTIVE STATE ────────────────────────── */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  /* ── MOBILE BURGER ───────────────────────────── */
  const burger   = document.getElementById('nav-burger');
  const mobileNav = document.getElementById('mobile-nav');
  const close    = document.getElementById('mobile-nav-close');
  if (burger)  burger.addEventListener('click', () => mobileNav.classList.add('open'));
  if (close)   close.addEventListener('click',  () => mobileNav.classList.remove('open'));

  /* ── CONTACT FORM ────────────────────────────── */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(form));
      const s = encodeURIComponent(d.subject || 'Contact bachelintech.com');
      const b = encodeURIComponent(`Nom: ${d.name}\nEmail: ${d.email}\n\n${d.message}`);
      window.location.href = `mailto:contact@bachelintech.com?subject=${s}&body=${b}`;
      form.style.display = 'none';
      const ok = document.getElementById('form-success');
      if (ok) ok.style.display = 'block';
    });
  }
});
```

- [ ] **Step 2: Commit**

```bash
git add assets/js/main.js
git commit -m "feat: add nav active state, mobile menu, contact form handler"
```

---

### Task 4: index.html

**Files:**
- Create: `index.html`

- [ ] **Step 1: Create `index.html`**

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Bachelin Tech — Solutions numériques pour l'Afrique. Yaoundé, Cameroun.">
  <title data-i18n="meta.title.home">Bachelin Tech — La vision d'un monde meilleur</title>
  <link rel="stylesheet" href="assets/css/main.css">
  <link rel="icon" type="image/png" href="assets/images/logo-btech.png">
</head>
<body>
  <nav id="main-nav">
    <a href="index.html" class="nav-brand"><img src="assets/images/logo-btech.png" alt="Bachelin Tech" class="nav-logo"></a>
    <ul class="nav-links">
      <li><a href="index.html"    data-i18n="nav.home">Accueil</a></li>
      <li><a href="projets.html"  data-i18n="nav.projects">Projets</a></li>
      <li><a href="services.html" data-i18n="nav.services">Services</a></li>
      <li><a href="a-propos.html" data-i18n="nav.about">À propos</a></li>
      <li><a href="contact.html"  data-i18n="nav.contact">Contact</a></li>
    </ul>
    <div class="nav-right">
      <button class="lang-toggle" id="lang-toggle">EN</button>
      <button class="nav-burger" id="nav-burger" aria-label="Menu">☰</button>
    </div>
  </nav>
  <div class="nav-mobile" id="mobile-nav">
    <button class="nav-mobile-close" id="mobile-nav-close">✕</button>
    <a href="index.html"    data-i18n="nav.home">Accueil</a>
    <a href="projets.html"  data-i18n="nav.projects">Projets</a>
    <a href="services.html" data-i18n="nav.services">Services</a>
    <a href="a-propos.html" data-i18n="nav.about">À propos</a>
    <a href="contact.html"  data-i18n="nav.contact">Contact</a>
  </div>

  <main>
    <section class="hero-split">
      <div class="hero-left">
        <div>
          <img src="assets/images/logo-btech.png" alt="Bachelin Tech" class="hero-logo">
          <p class="eyebrow" data-i18n="home.eyebrow">Yaoundé · Cameroun</p>
          <h1 class="hero-headline">
            <span data-i18n="home.headline1">La vision</span><br>
            <span data-i18n="home.headline2">d'un monde</span><br>
            <em class="brown" data-i18n="home.headline3">meilleur</em>
          </h1>
        </div>
        <div class="hero-meta">
          <p class="hero-tagline" data-i18n="home.tagline">Bachelin Tech conçoit des solutions numériques audacieuses pour l'Afrique.</p>
          <div class="hero-ctas">
            <a href="projets.html" class="btn-primary" data-i18n="home.cta.projects">Nos projets</a>
            <a href="contact.html" class="btn-ghost"   data-i18n="home.cta.contact">Nous écrire</a>
          </div>
        </div>
      </div>
      <div class="hero-right">
        <a href="projets.html#yocombi" class="hero-product">
          <div>
            <p class="eyebrow" data-i18n="home.prod1.eyebrow">Marketplace · Cameroun</p>
            <h2 class="prod-name">YoCombi<span class="brown">!</span></h2>
            <p data-i18n="home.prod1.desc">Connecter travailleurs et clients en 12 villes.</p>
          </div>
          <p class="prod-link">yocombi.com →</p>
        </a>
        <a href="projets.html#mia" class="hero-product">
          <div>
            <p class="eyebrow" data-i18n="home.prod2.eyebrow">IA · Immobilier</p>
            <h2 class="prod-name">M<span class="brown">.</span>I<span class="brown">.</span>A</h2>
            <p data-i18n="home.prod2.desc">L'IA au service de l'immobilier africain.</p>
          </div>
          <p class="prod-link">myimmoai.com →</p>
        </a>
      </div>
    </section>

    <section class="manifeste">
      <div>
        <div class="rule"></div>
        <blockquote><em class="brown" data-i18n="home.manifeste.quote">Nous construisons pour l'Afrique d'aujourd'hui et de demain.</em></blockquote>
      </div>
      <div>
        <p data-i18n="home.manifeste.p1">Bachelin Tech naît d'une conviction simple.</p>
        <p style="margin-top:14px" data-i18n="home.manifeste.p2">Chaque produit que nous créons part d'un problème réel.</p>
      </div>
    </section>

    <section class="services-preview">
      <div class="section-top">
        <div>
          <p class="eyebrow" data-i18n="home.services.eyebrow">Ce que nous faisons</p>
          <h2 style="font-size:28px;margin-top:10px" data-i18n="home.services.title">Nos expertises</h2>
        </div>
        <a href="services.html" class="btn-ghost" data-i18n="home.services.seeall">Voir tous les services</a>
      </div>
      <div class="services-grid">
        <div class="svc-item">
          <p class="svc-num">01</p>
          <h3 class="svc-name" data-i18n="home.svc1.name">Applications mobiles</h3>
          <p class="svc-desc" data-i18n="home.svc1.desc">iOS et Android pensées pour les marchés africains.</p>
        </div>
        <div class="svc-item">
          <p class="svc-num">02</p>
          <h3 class="svc-name" data-i18n="home.svc2.name">Plateformes web & API</h3>
          <p class="svc-desc" data-i18n="home.svc2.desc">De la landing page au back-office.</p>
        </div>
        <div class="svc-item">
          <p class="svc-num">03</p>
          <h3 class="svc-name" data-i18n="home.svc3.name">Intelligence artificielle</h3>
          <p class="svc-desc" data-i18n="home.svc3.desc">Intégration IA, automatisation, produits data-driven.</p>
        </div>
      </div>
    </section>

    <div class="cta-band">
      <div>
        <h2><span data-i18n="cta.headline1">Un projet en tête ?</span><br><em data-i18n="cta.headline2">Parlons-en.</em></h2>
        <p data-i18n="cta.sub">Nous transformons vos idées en solutions qui comptent.</p>
      </div>
      <a href="contact.html" class="btn-light" data-i18n="cta.btn">Nous contacter</a>
    </div>
  </main>

  <footer id="main-footer">
    <img src="assets/images/logo-btech.png" alt="Bachelin Tech" class="footer-logo">
    <p class="footer-copy" data-i18n="footer.copy">© 2025 Bachelin Tech · Yaoundé, Cameroun</p>
    <p class="footer-copy">bachelintech.com</p>
  </footer>
  <script src="assets/js/i18n.js"></script>
  <script src="assets/js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Open `index.html` in browser. Verify:**
  - Logo in nav and hero (not broken image icon)
  - Hero: 2-column split — headline left, YoCombi!/MIA panels right
  - Manifeste: white bg, quote left / text right
  - Services: 3 numbered items
  - CTA band: dark brown bg, cream text
  - Footer: lightened logo + copyright
  - Toggle EN → all text switches to English; toggle FR → reverts
  - Resize < 768px → burger appears, layout stacks

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add homepage"
```

---

### Task 5: projets.html

**Files:**
- Create: `projets.html`

- [ ] **Step 1: Create `projets.html`**

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title data-i18n="meta.title.projects">Nos Projets — Bachelin Tech</title>
  <link rel="stylesheet" href="assets/css/main.css">
  <link rel="icon" type="image/png" href="assets/images/logo-btech.png">
</head>
<body>
  <nav id="main-nav">
    <a href="index.html" class="nav-brand"><img src="assets/images/logo-btech.png" alt="Bachelin Tech" class="nav-logo"></a>
    <ul class="nav-links">
      <li><a href="index.html"    data-i18n="nav.home">Accueil</a></li>
      <li><a href="projets.html"  data-i18n="nav.projects">Projets</a></li>
      <li><a href="services.html" data-i18n="nav.services">Services</a></li>
      <li><a href="a-propos.html" data-i18n="nav.about">À propos</a></li>
      <li><a href="contact.html"  data-i18n="nav.contact">Contact</a></li>
    </ul>
    <div class="nav-right">
      <button class="lang-toggle" id="lang-toggle">EN</button>
      <button class="nav-burger" id="nav-burger" aria-label="Menu">☰</button>
    </div>
  </nav>
  <div class="nav-mobile" id="mobile-nav">
    <button class="nav-mobile-close" id="mobile-nav-close">✕</button>
    <a href="index.html" data-i18n="nav.home">Accueil</a>
    <a href="projets.html" data-i18n="nav.projects">Projets</a>
    <a href="services.html" data-i18n="nav.services">Services</a>
    <a href="a-propos.html" data-i18n="nav.about">À propos</a>
    <a href="contact.html" data-i18n="nav.contact">Contact</a>
  </div>
  <main>
    <header class="page-hero">
      <p class="eyebrow" data-i18n="projects.eyebrow">Nos réalisations</p>
      <h1 data-i18n="projects.title">Ce que nous avons construit</h1>
      <p style="margin-top:14px;max-width:520px" data-i18n="projects.sub">Deux produits propres, et des solutions sur-mesure pour nos clients.</p>
    </header>

    <section class="product-feature" id="yocombi">
      <div class="product-body">
        <span class="product-tag" data-i18n="projects.prod1.tag">Marketplace</span>
        <h2 class="product-name">YoCombi<span class="accent">!</span></h2>
        <p data-i18n="projects.prod1.desc1">YoCombi! connecte les travailleurs du secteur informel avec les demandeurs de services au Cameroun.</p>
        <p data-i18n="projects.prod1.desc2">Conçue pour de faibles connexions et accessible par SMS, elle couvre 12 villes avec Mobile Money.</p>
        <div class="product-meta">
          <div class="product-meta-item"><span class="product-meta-label">Technologies</span><span class="product-meta-value" data-i18n="projects.prod1.meta.tech">React Native · Node.js · Supabase</span></div>
          <div class="product-meta-item"><span class="product-meta-label">Couverture</span><span class="product-meta-value" data-i18n="projects.prod1.meta.cities">12 villes au Cameroun</span></div>
          <div class="product-meta-item"><span class="product-meta-label">Paiement</span><span class="product-meta-value" data-i18n="projects.prod1.meta.payment">Mobile Money (MTN / Orange)</span></div>
        </div>
        <a href="https://yocombi.com" target="_blank" rel="noopener" class="btn-primary" style="margin-top:28px">yocombi.com →</a>
      </div>
      <div class="product-visual"><span class="product-visual-placeholder">YC!</span></div>
    </section>

    <section class="product-feature" id="mia">
      <div class="product-visual"><span class="product-visual-placeholder">MIA</span></div>
      <div class="product-body">
        <span class="product-tag" data-i18n="projects.prod2.tag">Intelligence Artificielle · Immobilier</span>
        <h2 class="product-name">M<span class="accent">.</span>I<span class="accent">.</span>A</h2>
        <p data-i18n="projects.prod2.desc1">My Immo AI révolutionne la recherche et l'estimation immobilière en Afrique.</p>
        <p data-i18n="projects.prod2.desc2">Estimations précises, recommandations personnalisées et accompagnement IA tout au long du projet immobilier.</p>
        <div class="product-meta">
          <div class="product-meta-item"><span class="product-meta-label">Technologies</span><span class="product-meta-value" data-i18n="projects.prod2.meta.tech">React · Node.js · OpenAI API</span></div>
          <div class="product-meta-item"><span class="product-meta-label">Marché</span><span class="product-meta-value" data-i18n="projects.prod2.meta.market">Marché immobilier africain</span></div>
          <div class="product-meta-item"><span class="product-meta-label">Fonctionnalités</span><span class="product-meta-value" data-i18n="projects.prod2.meta.features">Estimation · Recherche · Conseil IA</span></div>
        </div>
        <a href="https://myimmoai.com" target="_blank" rel="noopener" class="btn-primary" style="margin-top:28px">myimmoai.com →</a>
      </div>
    </section>

    <section class="clients-section">
      <div class="section-top">
        <div>
          <p class="eyebrow" data-i18n="projects.clients.eyebrow">Réalisations clients</p>
          <h2 style="font-size:28px;margin-top:10px" data-i18n="projects.clients.title">Ils nous ont fait confiance</h2>
        </div>
      </div>
      <div class="clients-grid">
        <div class="client-card">
          <p class="client-sector">TRANSPORT & LOGISTIQUE</p>
          <h3 class="client-name">Urban Cargo</h3>
          <p class="client-desc">Plateforme de mise en relation pour le transport de marchandises en milieu urbain camerounais.</p>
        </div>
        <div class="client-card">
          <p class="client-sector">BEAUTÉ & BIEN-ÊTRE</p>
          <h3 class="client-name">Est'Hair</h3>
          <p class="client-desc">Solution de gestion et réservation en ligne pour salons de coiffure et instituts de beauté.</p>
        </div>
        <div class="client-card">
          <p class="client-sector">GROUPE D'ENTREPRISES</p>
          <h3 class="client-name">ELJ Group</h3>
          <p class="client-desc">Portail corporate multi-entités pour le groupe ELJ, incluant présentation des filiales et actualités.</p>
        </div>
        <div class="client-card">
          <p class="client-sector">ENVIRONNEMENT & TRAÇABILITÉ</p>
          <h3 class="client-name">EnviroTraces</h3>
          <p class="client-desc">Application de traçabilité environnementale pour le suivi des déchets et l'impact écologique.</p>
        </div>
        <div class="client-card">
          <p class="client-sector">CONSEIL & INVESTISSEMENT</p>
          <h3 class="client-name">Bachelin Consulting</h3>
          <p class="client-desc">Portail digital pour la société de conseil en stratégie et investissement, avec espace client sécurisé.</p>
        </div>
      </div>
    </section>

    <div class="cta-band">
      <div>
        <h2><span data-i18n="cta.headline1">Un projet en tête ?</span><br><em data-i18n="cta.headline2">Parlons-en.</em></h2>
        <p data-i18n="cta.sub">Nous transformons vos idées en solutions qui comptent.</p>
      </div>
      <a href="contact.html" class="btn-light" data-i18n="cta.btn">Nous contacter</a>
    </div>
  </main>
  <footer id="main-footer">
    <img src="assets/images/logo-btech.png" alt="Bachelin Tech" class="footer-logo">
    <p class="footer-copy" data-i18n="footer.copy">© 2025 Bachelin Tech · Yaoundé, Cameroun</p>
    <p class="footer-copy">bachelintech.com</p>
  </footer>
  <script src="assets/js/i18n.js"></script>
  <script src="assets/js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Open in browser. Verify:** "Projets" nav link active · YoCombi! card · MIA card (mirrored) · 5 client cards in grid · FR/EN toggle works.

- [ ] **Step 3: Commit**

```bash
git add projets.html
git commit -m "feat: add projects page — YoCombi!, MIA, 5 client cards"
```

---

### Task 6: services.html

**Files:**
- Create: `services.html`

- [ ] **Step 1: Create `services.html`**

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title data-i18n="meta.title.services">Nos Services — Bachelin Tech</title>
  <link rel="stylesheet" href="assets/css/main.css">
  <link rel="icon" type="image/png" href="assets/images/logo-btech.png">
</head>
<body>
  <nav id="main-nav">
    <a href="index.html" class="nav-brand"><img src="assets/images/logo-btech.png" alt="Bachelin Tech" class="nav-logo"></a>
    <ul class="nav-links">
      <li><a href="index.html"    data-i18n="nav.home">Accueil</a></li>
      <li><a href="projets.html"  data-i18n="nav.projects">Projets</a></li>
      <li><a href="services.html" data-i18n="nav.services">Services</a></li>
      <li><a href="a-propos.html" data-i18n="nav.about">À propos</a></li>
      <li><a href="contact.html"  data-i18n="nav.contact">Contact</a></li>
    </ul>
    <div class="nav-right">
      <button class="lang-toggle" id="lang-toggle">EN</button>
      <button class="nav-burger" id="nav-burger" aria-label="Menu">☰</button>
    </div>
  </nav>
  <div class="nav-mobile" id="mobile-nav">
    <button class="nav-mobile-close" id="mobile-nav-close">✕</button>
    <a href="index.html" data-i18n="nav.home">Accueil</a>
    <a href="projets.html" data-i18n="nav.projects">Projets</a>
    <a href="services.html" data-i18n="nav.services">Services</a>
    <a href="a-propos.html" data-i18n="nav.about">À propos</a>
    <a href="contact.html" data-i18n="nav.contact">Contact</a>
  </div>
  <main>
    <header class="page-hero">
      <p class="eyebrow" data-i18n="services.eyebrow">Nos expertises</p>
      <h1 data-i18n="services.title">Ce que nous faisons</h1>
      <p style="margin-top:14px;max-width:520px" data-i18n="services.sub">Du concept au déploiement, nous accompagnons chaque étape de votre projet digital.</p>
    </header>

    <section class="services-full">
      <div class="services-full-grid">
        <div class="service-full-item"><div class="service-icon">📱</div><h3 class="service-title" data-i18n="services.s1.title">Applications mobiles</h3><p class="service-text" data-i18n="services.s1.desc">…</p></div>
        <div class="service-full-item"><div class="service-icon">🌐</div><h3 class="service-title" data-i18n="services.s2.title">Plateformes web & API</h3><p class="service-text" data-i18n="services.s2.desc">…</p></div>
        <div class="service-full-item"><div class="service-icon">🤖</div><h3 class="service-title" data-i18n="services.s3.title">Intelligence artificielle</h3><p class="service-text" data-i18n="services.s3.desc">…</p></div>
        <div class="service-full-item"><div class="service-icon">🎨</div><h3 class="service-title" data-i18n="services.s4.title">UI/UX Design</h3><p class="service-text" data-i18n="services.s4.desc">…</p></div>
        <div class="service-full-item"><div class="service-icon">💡</div><h3 class="service-title" data-i18n="services.s5.title">Conseil digital</h3><p class="service-text" data-i18n="services.s5.desc">…</p></div>
        <div class="service-full-item"><div class="service-icon">⚙️</div><h3 class="service-title" data-i18n="services.s6.title">Déploiement & maintenance</h3><p class="service-text" data-i18n="services.s6.desc">…</p></div>
      </div>
    </section>

    <section class="process-section">
      <p class="eyebrow" data-i18n="services.process.eyebrow">Comment nous travaillons</p>
      <h2 style="font-size:28px;margin-top:10px" data-i18n="services.process.title">Notre processus</h2>
      <div class="process-steps">
        <div class="process-step"><p class="process-num">01</p><h3 class="process-title" data-i18n="services.p1.title">Comprendre</h3><p class="process-desc" data-i18n="services.p1.desc">…</p></div>
        <div class="process-step"><p class="process-num">02</p><h3 class="process-title" data-i18n="services.p2.title">Concevoir</h3><p class="process-desc" data-i18n="services.p2.desc">…</p></div>
        <div class="process-step"><p class="process-num">03</p><h3 class="process-title" data-i18n="services.p3.title">Construire</h3><p class="process-desc" data-i18n="services.p3.desc">…</p></div>
        <div class="process-step"><p class="process-num">04</p><h3 class="process-title" data-i18n="services.p4.title">Livrer</h3><p class="process-desc" data-i18n="services.p4.desc">…</p></div>
      </div>
    </section>

    <div class="cta-band">
      <div><h2><span data-i18n="cta.headline1">Un projet en tête ?</span><br><em data-i18n="cta.headline2">Parlons-en.</em></h2><p data-i18n="cta.sub">…</p></div>
      <a href="contact.html" class="btn-light" data-i18n="cta.btn">Nous contacter</a>
    </div>
  </main>
  <footer id="main-footer">
    <img src="assets/images/logo-btech.png" alt="Bachelin Tech" class="footer-logo">
    <p class="footer-copy" data-i18n="footer.copy">© 2025 Bachelin Tech · Yaoundé, Cameroun</p>
    <p class="footer-copy">bachelintech.com</p>
  </footer>
  <script src="assets/js/i18n.js"></script>
  <script src="assets/js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Open in browser. Verify:** "Services" nav active · 6 service cards (2-col) · 4 process steps · FR/EN works.

- [ ] **Step 3: Commit**

```bash
git add services.html
git commit -m "feat: add services page — 6 expertises + process"
```

---

### Task 7: a-propos.html

**Files:**
- Create: `a-propos.html`

- [ ] **Step 1: Create `a-propos.html`**

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title data-i18n="meta.title.about">À propos — Bachelin Tech</title>
  <link rel="stylesheet" href="assets/css/main.css">
  <link rel="icon" type="image/png" href="assets/images/logo-btech.png">
</head>
<body>
  <nav id="main-nav">
    <a href="index.html" class="nav-brand"><img src="assets/images/logo-btech.png" alt="Bachelin Tech" class="nav-logo"></a>
    <ul class="nav-links">
      <li><a href="index.html"    data-i18n="nav.home">Accueil</a></li>
      <li><a href="projets.html"  data-i18n="nav.projects">Projets</a></li>
      <li><a href="services.html" data-i18n="nav.services">Services</a></li>
      <li><a href="a-propos.html" data-i18n="nav.about">À propos</a></li>
      <li><a href="contact.html"  data-i18n="nav.contact">Contact</a></li>
    </ul>
    <div class="nav-right">
      <button class="lang-toggle" id="lang-toggle">EN</button>
      <button class="nav-burger" id="nav-burger" aria-label="Menu">☰</button>
    </div>
  </nav>
  <div class="nav-mobile" id="mobile-nav">
    <button class="nav-mobile-close" id="mobile-nav-close">✕</button>
    <a href="index.html" data-i18n="nav.home">Accueil</a>
    <a href="projets.html" data-i18n="nav.projects">Projets</a>
    <a href="services.html" data-i18n="nav.services">Services</a>
    <a href="a-propos.html" data-i18n="nav.about">À propos</a>
    <a href="contact.html" data-i18n="nav.contact">Contact</a>
  </div>
  <main>
    <header class="page-hero">
      <p class="eyebrow" data-i18n="about.eyebrow">Qui sommes-nous</p>
      <h1 data-i18n="about.title">À propos de Bachelin Tech</h1>
      <p style="margin-top:14px;font-family:var(--font-serif);font-size:18px;font-style:italic;color:var(--brown)" data-i18n="about.sub">"La vision d'un monde meilleur"</p>
    </header>

    <section class="about-histoire">
      <div>
        <p class="eyebrow" data-i18n="about.h.eyebrow">Notre histoire</p>
        <h2 data-i18n="about.h.title">Nés du terrain, construits pour l'Afrique</h2>
      </div>
      <div>
        <p data-i18n="about.h.p1">Bachelin Tech est une société de développement de solutions numériques basée à Yaoundé.</p>
        <p style="margin-top:16px" data-i18n="about.h.p2">Depuis notre fondation, nous avons développé YoCombi! et M.I.A.</p>
      </div>
    </section>

    <section class="values-section">
      <p class="eyebrow" data-i18n="about.v.eyebrow">Ce en quoi nous croyons</p>
      <h2 style="font-size:28px;margin-top:10px" data-i18n="about.v.title">Nos valeurs</h2>
      <div class="values-grid">
        <div class="value-card"><div class="rule"></div><h3 class="value-name" data-i18n="about.v1.name">Ancrage local</h3><p class="value-desc" data-i18n="about.v1.desc">…</p></div>
        <div class="value-card"><div class="rule"></div><h3 class="value-name" data-i18n="about.v2.name">Excellence</h3><p class="value-desc" data-i18n="about.v2.desc">…</p></div>
        <div class="value-card"><div class="rule"></div><h3 class="value-name" data-i18n="about.v3.name">Impact réel</h3><p class="value-desc" data-i18n="about.v3.desc">…</p></div>
      </div>
    </section>

    <section class="team-section">
      <p class="eyebrow" data-i18n="about.team.eyebrow">L'équipe</p>
      <h2 style="font-size:28px;margin-top:10px" data-i18n="about.team.title">Les bâtisseurs</h2>
      <p style="margin-top:12px;font-style:italic;color:var(--muted)" data-i18n="about.team.note">Page équipe à compléter avec les profils réels.</p>
      <div class="team-grid">
        <div class="team-placeholder"><div class="team-avatar"></div><p style="font-family:var(--font-sans);font-size:10px;letter-spacing:2px;color:var(--muted)">— À COMPLÉTER —</p></div>
        <div class="team-placeholder"><div class="team-avatar"></div><p style="font-family:var(--font-sans);font-size:10px;letter-spacing:2px;color:var(--muted)">— À COMPLÉTER —</p></div>
        <div class="team-placeholder"><div class="team-avatar"></div><p style="font-family:var(--font-sans);font-size:10px;letter-spacing:2px;color:var(--muted)">— À COMPLÉTER —</p></div>
      </div>
    </section>

    <section class="section" style="border-bottom:1px solid var(--border);background:var(--white)">
      <p class="eyebrow" data-i18n="about.location.eyebrow">Où nous sommes</p>
      <h2 style="font-size:28px;margin-top:10px" data-i18n="about.location.title">Yaoundé, Cameroun</h2>
      <p style="margin-top:14px;max-width:480px" data-i18n="about.location.desc">Basés au cœur de la capitale politique du Cameroun, nous opérons à l'échelle nationale et régionale.</p>
    </section>

    <div class="cta-band">
      <div><h2><span data-i18n="cta.headline1">Un projet en tête ?</span><br><em data-i18n="cta.headline2">Parlons-en.</em></h2><p data-i18n="cta.sub">…</p></div>
      <a href="contact.html" class="btn-light" data-i18n="cta.btn">Nous contacter</a>
    </div>
  </main>
  <footer id="main-footer">
    <img src="assets/images/logo-btech.png" alt="Bachelin Tech" class="footer-logo">
    <p class="footer-copy" data-i18n="footer.copy">© 2025 Bachelin Tech · Yaoundé, Cameroun</p>
    <p class="footer-copy">bachelintech.com</p>
  </footer>
  <script src="assets/js/i18n.js"></script>
  <script src="assets/js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Open in browser. Verify:** "À propos" active · histoire 2-col · 3 value cards with brown top border · team placeholders · FR/EN works.

- [ ] **Step 3: Commit**

```bash
git add a-propos.html
git commit -m "feat: add about page — histoire, valeurs, équipe, localisation"
```

---

### Task 8: contact.html

**Files:**
- Create: `contact.html`

- [ ] **Step 1: Create `contact.html`**

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title data-i18n="meta.title.contact">Contact — Bachelin Tech</title>
  <link rel="stylesheet" href="assets/css/main.css">
  <link rel="icon" type="image/png" href="assets/images/logo-btech.png">
</head>
<body>
  <nav id="main-nav">
    <a href="index.html" class="nav-brand"><img src="assets/images/logo-btech.png" alt="Bachelin Tech" class="nav-logo"></a>
    <ul class="nav-links">
      <li><a href="index.html"    data-i18n="nav.home">Accueil</a></li>
      <li><a href="projets.html"  data-i18n="nav.projects">Projets</a></li>
      <li><a href="services.html" data-i18n="nav.services">Services</a></li>
      <li><a href="a-propos.html" data-i18n="nav.about">À propos</a></li>
      <li><a href="contact.html"  data-i18n="nav.contact">Contact</a></li>
    </ul>
    <div class="nav-right">
      <button class="lang-toggle" id="lang-toggle">EN</button>
      <button class="nav-burger" id="nav-burger" aria-label="Menu">☰</button>
    </div>
  </nav>
  <div class="nav-mobile" id="mobile-nav">
    <button class="nav-mobile-close" id="mobile-nav-close">✕</button>
    <a href="index.html" data-i18n="nav.home">Accueil</a>
    <a href="projets.html" data-i18n="nav.projects">Projets</a>
    <a href="services.html" data-i18n="nav.services">Services</a>
    <a href="a-propos.html" data-i18n="nav.about">À propos</a>
    <a href="contact.html" data-i18n="nav.contact">Contact</a>
  </div>
  <main>
    <header class="page-hero">
      <p class="eyebrow" data-i18n="contact.eyebrow">Travaillons ensemble</p>
      <h1 data-i18n="contact.title">Parlons-en</h1>
      <p style="margin-top:14px;max-width:420px" data-i18n="contact.sub">Un projet, une idée, une question — nous sommes à l'écoute.</p>
    </header>
    <div class="contact-layout">
      <div>
        <form class="contact-form" id="contact-form" novalidate>
          <div class="form-group">
            <label class="form-label" for="name" data-i18n="contact.form.name">Votre nom</label>
            <input class="form-input" id="name" name="name" type="text" required data-i18n-placeholder="contact.form.name" placeholder="Votre nom">
          </div>
          <div class="form-group">
            <label class="form-label" for="email" data-i18n="contact.form.email">Votre email</label>
            <input class="form-input" id="email" name="email" type="email" required data-i18n-placeholder="contact.form.email" placeholder="Votre email">
          </div>
          <div class="form-group">
            <label class="form-label" for="subject" data-i18n="contact.form.subject">Sujet</label>
            <input class="form-input" id="subject" name="subject" type="text" data-i18n-placeholder="contact.form.subject" placeholder="Sujet">
          </div>
          <div class="form-group">
            <label class="form-label" for="message" data-i18n="contact.form.message">Votre message</label>
            <textarea class="form-textarea" id="message" name="message" rows="6" required data-i18n-placeholder="contact.form.message" placeholder="Votre message"></textarea>
          </div>
          <button type="submit" class="btn-primary form-submit" data-i18n="contact.form.send">Envoyer</button>
        </form>
        <p id="form-success" data-i18n="contact.form.success">Message reçu — nous vous répondons sous 48h.</p>
      </div>
      <div class="contact-info">
        <h3 data-i18n="contact.info.title">Coordonnées</h3>
        <div class="contact-info-item">
          <span class="info-label" data-i18n="contact.info.email.label">Email</span>
          <span class="info-value"><a href="mailto:contact@bachelintech.com" data-i18n="contact.info.email.value">contact@bachelintech.com</a></span>
        </div>
        <div class="contact-info-item">
          <span class="info-label" data-i18n="contact.info.location.label">Adresse</span>
          <span class="info-value" data-i18n="contact.info.location.value">Yaoundé, Cameroun</span>
        </div>
        <div class="contact-info-item">
          <span class="info-label" data-i18n="contact.info.hours.label">Disponibilité</span>
          <span class="info-value" data-i18n="contact.info.hours.value">Lun – Ven, 8h – 18h (WAT)</span>
        </div>
      </div>
    </div>
  </main>
  <footer id="main-footer">
    <img src="assets/images/logo-btech.png" alt="Bachelin Tech" class="footer-logo">
    <p class="footer-copy" data-i18n="footer.copy">© 2025 Bachelin Tech · Yaoundé, Cameroun</p>
    <p class="footer-copy">bachelintech.com</p>
  </footer>
  <script src="assets/js/i18n.js"></script>
  <script src="assets/js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Open in browser. Verify:** "Contact" nav active · form 4 fields · submit opens mailto + shows success message · 3 coordonnées items · FR/EN works on labels + placeholders.

- [ ] **Step 3: Commit**

```bash
git add contact.html
git commit -m "feat: add contact page — form + coordinates"
```

---

### Task 9: GitHub Pages setup

**Files:**
- Create: `CNAME`
- Create: `README.md`

- [ ] **Step 1: Create `CNAME`** (no newline at end)

```
bachelintech.com
```

- [ ] **Step 2: Create `README.md`**

```markdown
# bachelintech.com

Site vitrine de Bachelin Tech — solutions numériques pour l'Afrique.

**Stack :** HTML5 · CSS3 · Vanilla JS · Google Fonts  
**Déploiement :** GitHub Pages → bachelintech.com

## Développement local
Ouvrir `index.html` directement dans le navigateur. Pas de build.

## Mettre à jour l'email de contact
Chercher `contact@bachelintech.com` dans `assets/js/main.js` et `assets/js/i18n.js`.

## Mettre à jour les traductions
Toutes les traductions FR/EN sont dans `assets/js/i18n.js`, objet `translations`.

## Compléter la page équipe
Remplacer les blocs `— À COMPLÉTER —` dans `a-propos.html`.
```

- [ ] **Step 3: Commit + push**

```bash
git add CNAME README.md
git commit -m "chore: add CNAME for GitHub Pages and README"

# Créer le repo sur GitHub (public), puis :
git remote add origin https://github.com/bachelinconsulting/bachelintech-web.git
git push -u origin main
```

- [ ] **Step 4: Activer GitHub Pages**

Dans les Settings du repo GitHub :
- Pages → Source → Deploy from branch → `main` → `/ (root)`
- Custom domain → `bachelintech.com` → Save
- Activer "Enforce HTTPS"

- [ ] **Step 5: Enregistrements DNS chez le registrar de bachelintech.com**

```
A     @    185.199.108.153
A     @    185.199.109.153
A     @    185.199.110.153
A     @    185.199.111.153
CNAME www  bachelinconsulting.github.io
```

---

## Self-Review

**Spec coverage :** 5 pages ✓ · bilingue FR/EN ✓ · logo BTech.png ✓ · YoCombi + MIA ✓ · 5 clients ✓ · 6 services + processus ✓ · histoire/valeurs/équipe ✓ · formulaire contact ✓ · GitHub Pages ✓ · responsive ✓

**No TBD :** Les `…` dans services.html et a-propos.html sont des shortcodes HTML valides — i18n.js remplace le textContent au runtime. ✓

**Type consistency :** Toutes les clés `data-i18n` dans les HTML correspondent aux clés définies dans `translations` de i18n.js. Toutes les classes CSS utilisées dans les HTML sont définies dans main.css. ✓
