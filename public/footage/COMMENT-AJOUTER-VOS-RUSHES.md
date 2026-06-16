# Déposez vos rushes ici

Place tes vidéos filmées dans **ce dossier** (`public/footage/`), avec exactement
ces noms de fichiers. Tant qu'un fichier manque, l'étape affiche un panneau
« RUSH À DÉPOSER » décrivant le plan à filmer.

| Fichier à déposer | Étape | Plan à filmer |
| --- | --- | --- |
| `01-preparation.mp4` | 01 Préparation | Grenaillage / ponçage diamant, surface ouverte, hygromètre |
| `02-primaire.mp4` | 02 Primaire | Étalement du primaire au rouleau/raclette, sablage à refus |
| `03-profiles.mp4` | 03 Profilés | Pose & alignement des profilés laiton, collage résine |
| `04-matrice.mp4` | 04 Matrice | Versement Part A + durcisseur + granulats, malaxage |
| `05-talochage.mp4` | 05 Coulage **(PLAN HÉROS)** | Applicateur qui **taloche** entre les profilés (gros plan) |
| `06-cure.mp4` | 06 Polymérisation | Timelapse / vue du chantier au repos |
| `07-poncage.mp4` | 07 Ponçage | Ponceuse diamant, granulats qui apparaissent |
| `08-ragreage.mp4` | 08 Ragréage | Application du grout à la raclette |
| `09-cure-grout.mp4` | 09 Cure grout | Timelapse court |
| `10-lustrage.mp4` | 10 Lustrage | Passes successives, surface de plus en plus brillante |
| `11-finition.mp4` | 11 Finition | Vernis + goutte d'eau qui perle |
| `12-resultat.mp4` | 12 Résultat | Travelling lent sur le sol fini |

## Conseils de tournage
- **Filme à l'horizontale (16:9), 1080p ou plus, bien stable** (trépied / gimbal).
- Vise **8–15 s par plan** : le montage en garde une partie (réglable).
- Pour le **talochage (05)** et le **ponçage (07/10)** : des **gros plans** sur le
  geste et la matière, le montage les passe en **ralenti**.
- Le **son n'est pas utilisé** (piste muette, prête pour voix off).

## Régler le montage
Dans `src/edit/config.ts`, par étape : `durationSec` (durée à l'écran),
`inSec` (début du rush conservé), `slowmo` (1 = réel, 0.5 = ralenti ×2).

## Lancer le rendu
```bash
npm run render        # 16:9 + 9:16  →  out/formation-16x9.mp4 / formation-9x16.mp4
```
Les fichiers déposés ici sont détectés automatiquement (scan avant rendu).
