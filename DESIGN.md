---
name: Tana Express Logistics
colors:
  surface: '#f9f9ff'
  surface-dim: '#d3daea'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eefe'
  surface-container-high: '#e2e8f8'
  surface-container-highest: '#dce2f3'
  on-surface: '#151c27'
  on-surface-variant: '#5c403d'
  inverse-surface: '#2a313d'
  inverse-on-surface: '#ebf1ff'
  outline: '#906f6b'
  outline-variant: '#e5bdb9'
  surface-tint: '#bd111a'
  primary: '#bd111a'
  on-primary: '#ffffff'
  primary-container: '#e1312f'
  on-primary-container: '#150000'
  inverse-primary: '#ffb4ac'
  secondary: '#535e7b'
  on-secondary: '#ffffff'
  secondary-container: '#d1dcfe'
  on-secondary-container: '#56607d'
  tertiary: '#00628a'
  on-tertiary: '#ffffff'
  tertiary-container: '#127cac'
  on-tertiary-container: '#fcfcff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad6'
  primary-fixed-dim: '#ffb4ac'
  on-primary-fixed: '#410002'
  on-primary-fixed-variant: '#93000d'
  secondary-fixed: '#d9e2ff'
  secondary-fixed-dim: '#bbc6e7'
  on-secondary-fixed: '#0f1b34'
  on-secondary-fixed-variant: '#3b4662'
  tertiary-fixed: '#c7e7ff'
  tertiary-fixed-dim: '#83cfff'
  on-tertiary-fixed: '#001e2e'
  on-tertiary-fixed-variant: '#004c6c'
  background: '#f9f9ff'
  on-background: '#151c27'
  surface-variant: '#dce2f3'
typography:
  display-lg:
    fontFamily: Outfit
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
  body-lg:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-lg:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1.0rem
  margin-tablet: 1.5rem
  margin-desktop: 2.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

Le design system répond aux exigences spécifiques du commerce urbain et périurbain à Antananarivo : connectivité intermittente, luminosité extérieure intense lors des livraisons à moto, et besoin critique de rapidité d'exécution pour les commerçants indépendants. 

L'esthétique fusionne **Modern Corporate** et **Tactile Ergonomics** :
- **Clarté opérationnelle** : Réduction du bruit visuel pour privilégier l'état d'avancement des colis, les montants à encaisser (Cash on Delivery / Mobile Money : MVola, Airtel Money, Orange Money) et les coordonnées clients.
- **Fiabilité & Confiance** : Un traitement visuel net, structuré et lumineux qui rassure autant le boutiquier que le livreur.
- **Accessibilité terrain** : Des zones d'interaction surdimensionnées (minimum 48px), prévues pour un usage à une main sur smartphone en conditions de mobilité.

## Colors

La palette s'articule autour d'un socle lumineux ultra-contrasté assurant une lisibilité maximale sous le soleil des hauts plateaux :

- **Primaire (`#E1312F` - Rouge Express)** : Symbolise la livraison réussie, la validation de commande et l'encaissement. Utilisé pour les actions principales et les confirmations positives.
- **Secondaire (`#1F2A44` - Bleu Marine Foncé)** : Réservé aux actions de transit, géolocalisation, statut « En route » et appels directs aux livreurs/clients.
- **Tertiaire (`#0077A6` - Bleu Océan)** : Attribué aux statuts d'attente, de préparation et d'alertes non bloquantes.
- **Neutre & Surfaces (`#6B7280`)** :
  - Fond de toile : `#FAF8FF` pour atténuer la fatigue oculaire.
  - Cartes et conteneurs : `#FFFFFF` pur pour détacher l'information.
  - Bordures structurelles : `#6B7280`.
  - Typographie principale : `#131B2E` pour un ratio de contraste supérieur à 12:1.
- **Destructif / Incident (`#BA1A1A` - Rouge Carmin)** : Utilisé sans ambiguïté pour les annulations, colis refusés, pannes ou retards critiques.

## Typography

Le système typographique combine **Outfit** pour son dynamisme géométrique et son autorité sur les titres, et **Manrope** pour son rendu technique ultra-net sur les tables de données, adresses et descriptions.

Règles de composition :
- Les montants en Ariary (MGA) et les numéros de suivi utilisent systématiquement `body-lg-bold` ou `headline-sm` avec la police de chiffres tabulaires pour préserver l'alignement vertical dans les listes.
- Les badges de statut exploitent `label-sm` en majuscules avec un espacement de lettres élargi (`letterSpacing: 0.05em`) pour une reconnaissance visuelle instantanée lors de défilements rapides.

## Layout & Spacing

Le dimensionnement repose sur un pas de base strict de 4px / 8px :

- **Mobile (< 768px)** : Grille fluide à 4 colonnes. Marges latérales serrées à `1rem` (16px) pour maximiser la surface utile. Les éléments empilés (cartes de commande, récapitulatifs d'adresses) observent un écartement fixe de `0.75rem` (12px) à `1rem` (16px).
- **Tablette (768px - 1024px)** : Grille à 8 colonnes, marge extérieure de `1.5rem` (24px).
- **Bureau (> 1024px)** : Grille à 12 colonnes, largeur maximale de contenu centrée à 1280px, marge extérieure de `2.5rem` (40px). Séparation entre le panneau de navigation/filtrage et la liste de commandes par une gouttière de `1.5rem` (24px).

Les zones de contact interactives sur terminaux tactiles imposent une contrainte géométrique inconditionnelle de 48px de hauteur minimale.

## Elevation & Depth

Le design system adopte une approche combinant **Low-contrast outlines** et **Tonal layers**, enrichie d'ombres douces colorimétriquement neutres :

- **Niveau 0 (Toile)** : Fond plat `#FAF8FF`.
- **Niveau 1 (Cartes de livraison, panneaux)** : Surface `#FFFFFF`, bordure uniforme, ombre subtile.
- **Niveau 2 (Survol, cartes actives, volets mobiles)** : Surface `#FFFFFF`, bordure marquée, ombre portée.
- **Niveau 3 (Modales d'encaissement, menus contextuels)** : Surface `#FFFFFF`, ombre flottante accentuée.
- **Barre d'action inférieure flottante (Mobile)** : Fond `#FFFFFF` avec flou de recul (`backdrop-filter: blur(8px)` à 95% d'opacité) et séparateur supérieur fin.

## Shapes

La rondeur exprime la modernité et réduit l'agressivité des interfaces de gestion :
- Rayon standard (`rounded-md`, 8px) : Éléments denses de tableau, champs de saisie compacts sur desktop.
- Rayon étendu (`rounded-lg`, 16px) : Cartes d'expédition, boutons tactiles pleine largeur, conteneurs d'adresses.
- Rayon supérieur (`rounded-xl`, 24px) : Modales d'encaissement, volets contextuels bas de page (bottom sheets) sur mobile.
- Pastilles complètes (`rounded-full`) : Badges d'état opérationnel, pastilles de notification et boutons circulaires d'appel téléphonique rapide.

## Components

### Boutons
- **Taille tactile minimale** : Hauteur de 48px (mobile) ou 40px (desktop dense), rembourrage horizontal `1.25rem` (20px).
- **Primaire** : Fond `#E1312F`, texte blanc, arrondi 16px (`rounded-lg`), typographie `label-lg`.
- **Secondaire / Téléphone** : Fond `#FAF8FF`, bordure `1px solid`, texte `#1F2A44`.
- **Tertiaire / Discret** : Fond transparent, bordure fine, texte neutre.

### Badges de Statut (Delivery Status Chips)
Chaque statut combine un fond pastel désaturé, un texte à fort contraste et un indicateur à point plein (dot) de 8px.

### Cartes de Livraison (Delivery Cards)
- Fond blanc `#FFFFFF`, contour subtil, arrondi 16px (`rounded-lg`), rembourrage interne de `1rem` (16px).
- Organisation structurée en 3 zones distinctes (en-tête, corps, pied de carte).

### Champs de Saisie (Form Inputs)
- Hauteur de 48px avec fond `#FFFFFF`, bordure adaptée, arrondi 12px.
- État actif / focus : bordure `#E1312F` de 2px sans décalage de layout.