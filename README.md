# bachelintech.com

Site vitrine de Bachelin Tech — solutions numériques pour l'Afrique.

**Stack :** HTML5 · CSS3 · Vanilla JS · Google Fonts  
**Déploiement :** GitHub Pages → bachelintech.com

## Développement local

Ouvrir `index.html` directement dans le navigateur. Pas de build nécessaire.

## Mettre à jour l'email de contact

Chercher `contact@bachelintech.com` dans `assets/js/main.js` et `assets/js/i18n.js`.

## Mettre à jour les traductions FR/EN

Toutes les traductions sont dans `assets/js/i18n.js`, objet `translations`.

## Compléter la page équipe

Remplacer les blocs `— À COMPLÉTER —` dans `a-propos.html`.

## Déploiement GitHub Pages

1. Pousser ce repo sur `github.com/bachelinconsulting/bachelintech-web`
2. Settings → Pages → Source: `main` / `/ (root)`
3. Custom domain: `bachelintech.com`
4. Activer "Enforce HTTPS"

### DNS à configurer chez le registrar

```
A     @    185.199.108.153
A     @    185.199.109.153
A     @    185.199.110.153
A     @    185.199.111.153
CNAME www  bachelinconsulting.github.io
```

## Structure

```
├── index.html          Accueil
├── projets.html        Nos Projets
├── services.html       Services
├── a-propos.html       À propos
├── contact.html        Contact
├── brand-identity.html Charte graphique
├── assets/
│   ├── css/main.css    Design system complet
│   ├── js/i18n.js      Traductions FR/EN
│   ├── js/main.js      Interactions
│   └── images/         Logos
└── CNAME               GitHub Pages domain
```
