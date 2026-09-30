# Govee-like Light Card (HOLM)

Carte Lovelace custom pour Home Assistant, dédiée à l'intégration
[govee-homeassistant (lasswellt)](https://github.com/lasswellt/govee-homeassistant).

Même esprit visuel que [hue-like-light-card-holm](https://github.com/kaaribou/hue-like-light-card-holm)
(glassmorphism cyan/teal), mais écrite pour coller au modèle d'entités de l'intégration
Govee : luminosité, couleur RGB, température de couleur, mode musique et un sélecteur
de scènes graphique basé sur les images de `config/www/images/govee_img`.

> **Nouveau nom d'élément** : la carte s'appelle désormais `custom:holm-govee-light-card`
> (anciennement `custom:govee-like-light-card`). Pensez à mettre à jour vos tableaux de bord.

## Carte minimale quand éteinte

Quand l'entité `entity` est à `off`, la carte n'affiche que l'en-tête (icône, nom,
interrupteur) ; la barre de luminosité, les onglets et leur panneau sont masqués.
Tout réapparaît dès que la lumière est rallumée (l'onglet ouvert avant extinction est mémorisé).

## Fonctions

- Une entité `light.*` Govee : marche / arrêt, luminosité, couleur, température.
- Glissements fluides : la luminosité, la couleur, la température et la sensibilité
  musicale se mettent à jour pendant le glissement, sans saturer l'API Govee.
- Sélecteur de scènes graphique sur `select.<appareil>_scene` / `select.<appareil>_diy_scene`
  (onglets Scènes / DIY si les deux sont configurés).
- Onglet Musique (interrupteur, mode, sensibilité) si les entités correspondantes sont renseignées.
- Les segments RGBIC (`light.xxx_segment_1..15`) ne sont pas gérés.

## Installation

1. Copier `dist/holm-govee-like-light-card.js` dans
   `/config/www/community/holm-cards/holm-govee-like-light-card.js`
2. Ajouter la ressource : *Paramètres → Tableaux de bord → Ressources* →
   `/local/community/holm-cards/holm-govee-like-light-card.js` (type : Module JavaScript)
3. Vérifier que les images de scènes sont dans `/config/www/images/govee_img/`
   (accessibles sous `/local/images/govee_img/...`)

## Configuration

La carte a un éditeur visuel complet (entités, nom, icône, couleur, repli). En YAML :

```yaml
type: custom:holm-govee-light-card
entity: light.bandeau_led
scene_entity: select.bandeau_led_scene
diy_scene_entity: select.bandeau_led_diy_scene   # optionnel
name: Bandeau LED                                 # optionnel, sinon friendly_name
icon: mdi:led-strip-variant                       # optionnel
icon_color: [34, 211, 238]                        # optionnel [r,g,b], sinon suit la couleur de la lumière
image_path: /local/images/govee_img/              # optionnel, valeur par défaut
collapsible: true                                 # optionnel, true par défaut
music_switch_entity: switch.bandeau_led_music_mode              # optionnel
music_mode_entity: select.bandeau_led_music_mode                # optionnel
music_sensitivity_entity: number.bandeau_led_music_sensitivity  # optionnel
```

Seul `entity` est obligatoire. Sans `scene_entity` / `diy_scene_entity`, l'onglet Scènes est
désactivé ; l'onglet Musique n'apparaît que si au moins une entité musique est configurée.

### Repli (`collapsible`)

Par défaut, les panneaux Couleur / Température / Scènes sont repliés : seuls l'en-tête, la barre
de luminosité et les onglets sont visibles. Un toucher sur un onglet déplie son panneau, un second
le replie. Avec `collapsible: false`, un panneau reste toujours ouvert.

## Images des scènes

Chaque nom de scène (tel qu'il apparaît dans le `select`) est associé à une image du dossier
`govee_img` (assets de Govee Desktop). Les scènes sans image (dont les scènes DIY) utilisent une
tuile générée (dégradé + icône), toujours la même pour un nom donné. Le détail des correspondances
et leur niveau de confiance est dans `MAPPING_REVIEW.md`.

## Aperçu couleur en direct

L'icône et le fond de la carte suivent l'attribut `rgb_color` de la lumière, y compris pendant une
scène. Si Govee ne remonte pas la couleur pendant un effet dynamique, la carte garde la dernière
couleur connue.

## Historique

Les sources TypeScript des versions précédentes restent disponibles dans l'historique du dépôt.
