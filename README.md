# Govee-like Light Card (HOLM)

Carte Lovelace custom pour Home Assistant, dédiée à l'intégration
[govee-homeassistant (lasswellt)](https://github.com/lasswellt/govee-homeassistant).

Même esprit visuel que le fork [hue-like-light-card-holm](https://github.com/kaaribou/hue-like-light-card-holm)
(glassmorphism cyan/teal), mais réécrite de zéro pour coller au modèle d'entités
de l'intégration Govee : luminosité, couleur RGB, température de couleur, et un
sélecteur de scènes graphique basé sur les images trouvées dans
`config/www/images/govee_img`.

## Carte minimale quand éteinte

Quand l'entité `entity` est à `off`, la carte n'affiche que le header (icône,
nom, interrupteur) — la barre de luminosité, les onglets et leur panneau sont
masqués. Tout réapparaît dès que la lumière est rallumée (et l'onglet ouvert
avant extinction est mémorisé).

## v1 — périmètre

- Pilote une seule entité `light.*` Govee (on/off, luminosité, couleur, température)
- Sélecteur de scènes graphique sur les `select.<device>_scene` /
  `select.<device>_diy_scene` (avec onglets Scènes / DIY si les deux sont configurés)
- Les segments RGBIC (`light.xxx_segment_1..15`) ne sont **pas** gérés dans cette
  v1 — prévu pour une phase 2

## Installation

1. Copier `dist/govee-like-light-card.js` dans
   `/config/www/community/govee-like-light-card-holm/govee-like-light-card.js`
2. Ajouter la ressource dans Home Assistant :
   *Paramètres → Tableaux de bord → Ressources* →
   `/local/community/govee-like-light-card-holm/govee-like-light-card.js` (type: Module JavaScript)
3. Vérifier que les images de scènes sont bien dans
   `/config/www/images/govee_img/` (accessibles depuis HA sous `/local/images/govee_img/...`)

## Configuration

La carte a un éditeur visuel complet (entités, nom, icône, couleur, collapse) —
pas besoin de YAML pour la config de base. En YAML, ça ressemble à :

```yaml
type: custom:govee-like-light-card
entity: light.bar_guinguette
scene_entity: select.bar_guinguette_scene
diy_scene_entity: select.bar_guinguette_diy_scene   # optionnel
name: Bar Guinguette                                 # optionnel, sinon friendly_name
icon: mdi:led-strip-variant                          # optionnel, sinon icône de l'entité
icon_color: [34, 211, 238]                           # optionnel [r,g,b], sinon suit la couleur de la lumière
image_path: /local/images/govee_img/                 # optionnel, valeur par défaut
collapsible: true                                    # optionnel, true par défaut
music_switch_entity: switch.bar_guinguette_music_mode           # optionnel
music_mode_entity: select.bar_guinguette_music_mode             # optionnel
music_sensitivity_entity: number.bar_guinguette_music_sensitivity  # optionnel
```

Seul `entity` est obligatoire. Sans `scene_entity`/`diy_scene_entity`, l'onglet
"Scènes" est simplement désactivé. Même chose pour l'onglet "Musique" : il
n'apparaît (activé) que si au moins une des trois entités
`music_switch_entity` / `music_mode_entity` / `music_sensitivity_entity` est
configurée.

### Collapse (`collapsible`)

Par défaut (`collapsible: true`), les panneaux Couleur / Température / Scènes
sont repliés à l'ouverture — seuls le header, la barre de luminosité et la
rangée d'onglets sont visibles. Cliquer sur un onglet déplie son panneau ;
recliquer dessus le replie. Avec `collapsible: false`, on retrouve le
comportement de la v1 : un panneau toujours ouvert (le premier disponible).

## Mapping des images de scènes

`src/scene-image-map.ts` associe chaque nom de scène HA (tel qu'il apparaît dans
les options du `select`) au fichier image correspondant, extrait du dossier
`govee_img` (assets bruts de Govee Desktop, noms de fichiers souvent en pinyin).

- 106 scènes sur 145 rencontrées sur tes 2 appareils Govee ont une image réelle
- Les scènes non reconnues (dont toutes tes DIY scenes) retombent automatiquement
  sur une tuile générée (dégradé + icône), stable pour un même nom de scène

Voir `MAPPING_REVIEW.md` pour le détail du mapping et le niveau de confiance de
chaque correspondance (certaines traductions pinyin → anglais sont des
suppositions raisonnables, marquées "🟡 moyenne" ou "🔴 faible" — à vérifier une
fois la carte affichée en vrai).

Si tu retrouves/renommes des images côté `govee_img`, il suffit de régénérer ou
éditer `src/scene-image-map.ts` (`{ "Nom de la scène": "fichier.png" }`) puis de
relancer `npm run build`.

## Développement

```bash
npm install
npm run build       # build minifié dist/govee-like-light-card.js
npm run build:dev   # build avec sourcemap, sans minification
npm run typecheck   # tsc --noEmit
```

## Presets (drapeaux, motifs...)

Pas de contrôle de segments RGBIC dans la carte : l'API cloud Govee est trop
limitée en requêtes/minute pour piloter un clignotement en direct depuis la
carte de façon fiable. À la place, crée l'effet directement dans l'appli
Govee (couleurs par segment + dynamisme/clignotement natif) et enregistre-le
comme scène DIY — il apparaîtra automatiquement dans l'onglet Scènes/DIY de
la carte, comme n'importe quelle autre scène.

## Aperçu couleur en direct (icône / fond de carte)

L'icône et le fond de la carte suivent en direct l'attribut `rgb_color` de
l'entité lumière, y compris pendant qu'une scène/DIY est active. Govee ne
remonte pas toujours une couleur en temps réel pendant un effet dynamique
(limitation de l'API/intégration, pas de la carte) : dans ce cas, la carte
garde la dernière couleur connue plutôt que de retomber sur un blanc neutre.

## Roadmap

- Vérification / correction manuelle des mappings de scènes à confiance
  moyenne/faible listés dans `MAPPING_REVIEW.md`
