# StatBar — Front

### 🔗 Site en ligne : **[statbar.vercel.app](https://statbar.vercel.app)**

Frontend de **StatBar**, l'app pour noter, cartographier et classer ses bars préférés.

Interface React + TypeScript qui consomme l'API [`api-bar`](https://github.com/MartinQueval/api-bar).

---

## ✨ Fonctionnalités

- **Accueil** — présentation et accès rapide aux 3 sections (layout adapté au mobile).
- **Ajouter un bar** — recherche du lieu par son nom (autocomplétion **Photon / OpenStreetMap**, centrée sur Rouen) qui place automatiquement le pin, ou placement manuel sur la carte ; notation par catégorie via sliders.
- **Carte** — tous les bars affichés sur une carte interactive **Leaflet** avec leurs notes.
- **Classement** — tri par moyenne ou par catégorie de note, avec étoiles et podium.
- **Multilingue** — Français, English et un mode **Custom** personnalisable (par défaut), changement à chaud et mémorisé.
- **UX soignée** — glassmorphism, animations, transitions de page, responsive mobile, police TT Drugs.

## 🛠️ Stack

- [Vite](https://vite.dev/) + [React](https://react.dev/) + TypeScript
- [MUI](https://mui.com/) (composants + thème)
- [react-router-dom](https://reactrouter.com/) — navigation
- [react-leaflet](https://react-leaflet.js.org/) + OpenStreetMap — cartes
- [axios](https://axios-http.com/) — appels API
- [react-i18next](https://react.i18next.com/) — internationalisation

## 🚀 Démarrage local

```bash
npm install
npm run dev      # http://localhost:5173
```

L'API doit tourner en parallèle (voir le repo [`api-bar`](https://github.com/MartinQueval/api-bar)).

## ⚙️ Variables d'environnement

Crée un fichier `.env` (voir `.env.example`) :

```bash
# URL de l'API (préfixe /api inclus)
VITE_API_URL=http://localhost:4000/api        # local
# VITE_API_URL=https://api-bar-n4v8.onrender.com/api   # production
```

> Sur Vercel, `VITE_API_URL` est définie dans les variables d'environnement du projet.

## 📦 Scripts

| Commande | Description |
|---|---|
| `npm run dev` | Serveur de développement (HMR) |
| `npm run build` | Build de production (`tsc -b && vite build`) |
| `npm run preview` | Prévisualise le build de production |
| `npm run lint` | Analyse ESLint |

## 🌍 Déploiement

Hébergé sur **Vercel** ([statbar.vercel.app](https://statbar.vercel.app)). Le fichier `vercel.json` réécrit toutes les routes vers `index.html` (SPA), pour que les routes client (`/carte`, `/classement`, `/modifier/:id`) survivent à un rechargement.

## 🔤 Polices

La police **TT Drugs** (auto-hébergée dans `src/assets/fonts`) est en version *Trial* — une licence commerciale [TypeType](https://typetype.org/) est requise pour un usage en production publique.
