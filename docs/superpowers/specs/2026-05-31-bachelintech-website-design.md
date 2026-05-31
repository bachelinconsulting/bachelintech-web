# Spec — Site vitrine bachelintech.com

**Date :** 2026-05-31  
**Statut :** Approuvé  
**Domaine :** bachelintech.com  
**Repo GitHub :** bachelinconsulting/bc-web (ou nouveau repo dédié)

---

## 1. Vue d'ensemble

Site vitrine multi-pages pour **Bachelin Tech**, société de développement de solutions numériques basée à Yaoundé, Cameroun. Le site présente l'identité de la société, ses deux produits propres (YoCombi! et M.I.A), ses services aux clients, et propose un formulaire de contact.

**Slogan :** La vision d'un monde meilleur  
**Langue :** Bilingue FR/EN avec bascule dans la nav (approche data-i18n)  
**Stack :** HTML/CSS/JS vanilla — zéro dépendance, déployable sur GitHub Pages  

---

## 2. Design System

### Palette
| Token | Valeur | Usage |
|---|---|---|
| `--cream` | `#F5F0EB` | Background principal |
| `--brown` | `#3D1A0A` | Couleur primaire, CTA, accents |
| `--dark` | `#1a0a04` | Texte titres |
| `--footer-bg` | `#140805` | Footer |
| `--white` | `#ffffff` | Sections alternées (Manifeste) |
| `--border` | `rgba(61,26,10,0.10)` | Séparateurs |
| `--text-muted` | `rgba(61,26,10,0.50)` | Corps de texte secondaire |

### Typographie
| Rôle | Font | Poids |
|---|---|---|
| Titres / citations | Cormorant Garamond | 300, 400, italic |
| Corps / nav / labels | Inter | 300, 400, 500, 600 |

### Spacing
Base 8px. Sections : `padding: 64px 52px`. Nav : `height: 72px`.

### Logo
Fichier source : `assets/images/logo-btech.png`  
- **Nav :** logo complet (cercle + TECH), hauteur 44px — le fond crème du PNG (#F2EDE8) se fond naturellement sur le fond nav (#F5F0EB). ⚠️ Idéalement remplacer par un PNG fond transparent en v2.  
- **Hero :** logo complet (cercle + TECH), hauteur 72px  
- **Footer :** logo complet, filtre `brightness(10) opacity(0.4)` pour rendu blanc sur fond très sombre  

**Note :** Pour la production, prévoir une version SVG ou PNG fond transparent.

---

## 3. Architecture des fichiers

```
bachelintech.com/
├── index.html              ← Accueil
├── projets.html            ← Nos Projets
├── services.html           ← Services
├── a-propos.html           ← À propos
├── contact.html            ← Contact
├── assets/
│   ├── css/
│   │   └── main.css        ← Design system + styles globaux
│   ├── js/
│   │   ├── i18n.js         ← Traductions FR/EN + logique de bascule
│   │   └── main.js         ← Nav mobile, formulaire, scroll
│   └── images/
│       ├── logo-btech.png  ← Logo Bachelin Tech
│       └── (logos MIA, YoCombi si disponibles)
├── .gitignore
└── README.md
```

---

## 4. Pages

### 4.1 `index.html` — Accueil

| Section | Description |
|---|---|
| **Nav sticky** | Logo gauche · liens 5 pages centre · toggle FR/EN droite |
| **Hero split** | Gauche : logo grand format + accroche + tagline + 2 CTA / Droite : 2 panneaux YoCombi! et M.I.A |
| **Manifeste** | Fond blanc · citation gauche + texte philosophie droite |
| **Services aperçu** | 3 expertises numérotées (01, 02, 03) avec séparateurs verticaux + lien "Voir tous" |
| **CTA band** | Fond brun foncé · "Un projet en tête ? Parlons-en." + bouton Contact |
| **Footer** | Logo blanc · copyright · domaine |

### 4.2 `projets.html` — Nos Projets

| Section | Description |
|---|---|
| **Page hero** | Titre "Nos Projets" + sous-titre · ligne décorative |
| **YoCombi! — grande carte** | Logo, description complète, villes couvertes (12), technologies, lien yocombi.com |
| **M.I.A — grande carte** | Logo MIA si dispo, description, fonctionnalités IA, lien myimmoai.com |
| **Réalisations clients** | Grille de cartes sobres — projets identifiés : **Urban Cargo**, **Est'Hair**, **ELJ Group**, **EnviroTraces**, **Bachelin Consulting** (portail). Chaque carte : nom + secteur + description 1-2 phrases. ⚠️ Descriptions à valider avec l'équipe. |

### 4.3 `services.html` — Services

| Section | Description |
|---|---|
| **Page hero** | Titre "Nos Services" |
| **6 services en détail** | Applications mobiles · Plateformes web & API · Intelligence artificielle · UI/UX Design · Conseil digital · Déploiement & maintenance |
| **Notre processus** | 4 étapes : Comprendre → Concevoir → Construire → Livrer |
| **CTA** | Renvoi vers Contact |

### 4.4 `a-propos.html` — À propos

| Section | Description |
|---|---|
| **Page hero** | Titre + citation fondatrice |
| **Notre histoire** | Récit de Bachelin Tech, Yaoundé, vision, pourquoi l'Afrique |
| **Nos valeurs** | 3 valeurs clés (ex : Ancrage local, Excellence, Impact) |
| **L'équipe** | Placeholder — à personnaliser avec photos/noms réels |
| **Localisation** | Yaoundé, Cameroun — carte textuelle ou visuel simple |

### 4.5 `contact.html` — Contact

| Section | Description |
|---|---|
| **Page hero** | Titre "Parlons-en" |
| **Formulaire** | Champs : Nom · Email · Sujet · Message · Bouton Envoyer |
| **Coordonnées** | Email (`contact@bachelintech.com` — ⚠️ à confirmer) · Localisation (Yaoundé) |
| **Note** | Le formulaire HTML envoie via `mailto:` en v1 (pas de backend). Peut être branché à Formspree ou Supabase en v2. |

---

## 5. Système i18n (data-i18n)

```html
<!-- Exemple de balisage -->
<h1 data-i18n="hero.headline">La vision d'un monde meilleur</h1>
<p data-i18n="hero.tagline">Nous concevons des solutions...</p>
```

```js
// i18n.js — structure
const translations = {
  fr: { "hero.headline": "La vision d'un monde meilleur", ... },
  en: { "hero.headline": "The vision of a better world", ... }
};
function setLang(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = translations[lang][el.dataset.i18n] || el.textContent;
  });
  localStorage.setItem('lang', lang);
}
```

La langue par défaut est `fr`. Le toggle dans la nav bascule et persiste via `localStorage`.

---

## 6. Composants partagés

- **Nav** : identique sur toutes les pages, active state sur le lien courant via JS (`window.location.pathname`)
- **Footer** : identique sur toutes les pages
- **Page hero** (pages intérieures) : bandeau titre sobre, même hauteur ~200px, bordure basse
- Ces composants sont dupliqués dans chaque HTML (pas de server-side includes — vanilla oblige)

---

## 7. Formulaire de contact (v1)

Action `mailto:` pour v1, pas de dépendance backend. Structure :

```html
<form id="contact-form">
  <input name="name" data-i18n-placeholder="contact.name" required>
  <input name="email" type="email" required>
  <input name="subject" data-i18n-placeholder="contact.subject">
  <textarea name="message" rows="6" required></textarea>
  <button type="submit">ENVOYER</button>
</form>
```

---

## 8. GitHub & déploiement

- Repo : `bachelinconsulting/bachelintech-web` (nouveau repo public ou privé)
- Branch : `main`
- Déploiement : GitHub Pages sur `bachelintech.com` via custom domain (`CNAME` file)
- `.gitignore` : `.DS_Store`, `.superpowers/`, `*.backup`

---

## 9. Ce qui est hors scope (v1)

- Backend formulaire de contact (Formspree / Supabase en v2)
- Blog / actualités
- Page de recrutement
- CMS
- Analytics (à brancher via PostHog en v2 si souhaité)
