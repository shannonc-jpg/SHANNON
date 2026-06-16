# Prompt pour Claude Code — Vidéo de présentation du système Terrazzo (résine)

## Objectif
Génère une **vidéo animée** (`.mp4`) qui présente, étape par étape, tout le déroulement d'un système de sol **terrazzo résine (époxy)** : de la préparation du support jusqu'à la finition.
Public : clients B2B, prescripteurs (architectes), applicateurs. Ton : pro, pédagogique, haut de gamme. Langue : **français**. Durée cible : **75–90 secondes**.

## Approche technique (à respecter)
- Réalise la vidéo avec **Remotion** (React + TypeScript), le framework de génération vidéo par le code.
- Initialise le projet, installe les dépendances, construis les compositions, puis **rends le fichier final** avec `npx remotion render`.
- Format principal : **1920×1080, 30 fps, MP4 (H.264)**. Génère **aussi** une version verticale **1080×1920** (réseaux sociaux : Instagram / LinkedIn).
- **Pas d'images IA photoréalistes ni de vidéo générée** : on veut un **motion design propre et précis**. L'élément central est une **coupe technique animée du sol** qui se construit couche par couche, scène après scène — c'est la façon la plus exacte de montrer le système.
- Pas de musique sous copyright (silence, ou piste libre de droits si dispo). Sous-titres FR intégrés ; voix off optionnelle (TTS, ou laisser la piste prête à recevoir un enregistrement).

## Concept visuel
- **Visuel héros** : une **coupe latérale** du sol (vue de côté) qui s'empile progressivement — support béton → primaire → profilés → matrice résine+granulats → surface poncée révélant les granulats → vernis brillant. Chaque scène ajoute ou transforme une couche, avec un libellé.
- **Vue de dessus** complémentaire sur certaines scènes : apparition des **profilés (joints laiton/zinc)**, du calepinage et du design (panneaux, logo, incrustations marbre).
- **Esthétique terrazzo** : fond moucheté (éclats multicolores marbre / verre / nacre), lignes de profilés couleur laiton, typographie sans-serif moderne, beaucoup de blanc.
- Palette : neutres clairs + 1 couleur d'accent 2A Résine *(remplace par les couleurs de la charte ; sinon propose une palette sobre)*.
- Transitions fluides entre scènes, compteur d'étape (1/11, 2/11…), titres courts.

## Découpage scène par scène
*(une scène ≈ 6–8 s ; affiche le titre, l'animation de la coupe, le sous-titre FR et les paramètres techniques)*

0. **Générique d'ouverture** — Logo 2A Résine + titre « Le système Terrazzo — du support à la finition ». Mention partenaire : Sherwin-Williams Resuflor.

1. **Préparation du support** — Béton grenaillé / poncé au diamant pour ouvrir la surface (profil **CSP 4–6**). Contrôle d'humidité (**< 75 % HR**). Traitement des fissures + pontage, membrane d'armature si besoin. *Visuel : dalle béton, grenaillage, hygromètre, fissure traitée.*

2. **Primaire d'accrochage** — Application du primaire époxy (type **Resuprime**), éventuel sablage à refus pour le pont d'adhérence. *Visuel : couche de primaire qui recouvre le béton + grains de sable.*

3. **Pose des profilés / calepinage** — Mise en place des **profilés de fractionnement (laiton / zinc)** collés à la résine, qui dessinent les panneaux, les joints, le logo, les incrustations marbre. *Visuel : vue de dessus, les profilés se posent et forment le motif.*

4. **Préparation de la matrice** — Malaxage de la **résine époxy bi-composant** (Part A + durcisseur) avec les **granulats** (marbre, verre, nacre…) et les pigments, au malaxeur mécanique. *Visuel : les composants se versent et se mélangent.*

5. **Coulage & talochage** — La matrice est coulée entre les profilés et talochée à l'épaisseur nominale (**≈ 9–10 mm / 3/8″**). *Visuel : la matrice remplit la coupe jusqu'au haut des profilés.*

6. **Polymérisation** — Durcissement (**≈ 18–24 h**). *Visuel : indicateur de temps / chrono.*

7. **Ponçage – dégrossissage** — Ponçage diamant gros grain (~**24 grit**) pour mettre à nu les granulats et araser au niveau des profilés. *Visuel : la surface passe de résine brute à granulats apparents mouchetés.*

8. **Ragréage / bouchage des pores** — Application d'une couche de grout (même résine) pour combler bulles et micro-trous. *Visuel : fine couche qui remplit les pores.*

9. **Polymérisation du grout** — Durcissement (**≈ 24 h**).

10. **Ponçage progressif & lustrage** — Passes successives à grains croissants (**50 → 100 → 200 → … → 3000**) jusqu'au niveau de brillance voulu (mat / satiné / poli). *Visuel : compteur de grain, surface de plus en plus brillante.*

11. **Protection & finition** — Bouche-pores / vernis (**2 couches**), lustrage final. Démo de la goutte d'eau qui perle. *Visuel : éclat final + reflets.*

12. **Résultat & clôture** — Révélation du sol terrazzo fini (panneaux, profilés laiton, incrustations). Logo 2A Résine + coordonnées + « En partenariat avec Sherwin-Williams Resuflor ».

## Données techniques de référence (à afficher, ajuster aux fiches produits)
- Profil de surface : **CSP 4–6** (grenaillage / ponçage diamant)
- Humidité du support : **< 75 % HR** (sinon barrière anti-humidité type **Resuprime MVT**)
- Primaire : **Resuprime 3579** (ou ST / MVT selon support)
- Membrane de pontage (option) : **Resuflor 3556** + voile de verre
- Matrice : **Resuflor Terrazzo TG / Resuflor 3520** (résine époxy bi-comp + granulats marbre)
- Épaisseur : **≈ 9–10 mm (3/8″)**
- Cure matrice : **18–24 h** ; cure grout : **24 h**
- Ponçage : dégrossissage **~24 grit**, lustrage **jusqu'à 3000 grit**
- Protection : **2 couches** de bouche-pores / vernis (ex. **Acrydur Aqua 4401 / 4503**)

> ⚠️ Valeurs indicatives standard. **Cale les chiffres exacts sur la fiche technique (TDS) Resuflor / HB Terrazzo** avant le rendu final.

## Voix off (script FR — optionnel, 1 phrase par étape)
1. « Tout commence par le support : le béton est grenaillé pour ouvrir la surface et garantir l'accroche. »
2. « On applique ensuite un primaire qui crée le pont d'adhérence avec la résine. »
3. « Les profilés en laiton sont posés : ils dessinent les panneaux, les joints et les motifs. »
4. « La matrice est préparée : résine époxy, granulats de marbre et pigments, malaxés ensemble. »
5. « Elle est coulée entre les profilés et talochée à l'épaisseur voulue. »
6. « Après polymérisation… »
7. « …la surface est poncée pour révéler les granulats. »
8. « Un ragréage comble les dernières bulles. »
9. « Puis vient le ponçage progressif… »
10. « …grain après grain, jusqu'au poli miroir. »
11. « Une protection finale scelle le sol et le rend imperméable. »
12. « Le résultat : un terrazzo unique, sans joint, durable. 2A Résine. »

## Branding
- Prévois des **emplacements logo** (chemin `logo-2a.png` à intégrer si fourni ; sinon placeholder texte « 2A Résine »).
- Couleurs / typo : applique la charte 2A si fournie, sinon palette sobre + sans-serif géométrique.
- Mention partenaire **Sherwin-Williams Resuflor** en ouverture et clôture.

## Livrables attendus
1. Le **projet Remotion** complet (code source).
2. La **vidéo rendue** : `terrazzo-16x9.mp4` (+ `terrazzo-9x16.mp4`).
3. Un **README** court : comment relancer le rendu et où changer les textes / couleurs / durées.

## Option (si tu veux aller plus loin)
- Ajoute une **scène comparative** « coulé (cast) vs saupoudré (broadcast / HB Terrazzo) » pour montrer les deux variantes du système.
